<?php

namespace App\Controller;

use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use App\Repository\ReservationRepository;
use DateTime;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mime\Email;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\VarDumper\Cloner\Data;

class AppController extends AbstractController
{

    private $mailer;
    private $invoice_repository;
    private $reservation_repository;


    public function __construct(MailerInterface $mailer, InvoiceRepository $invoice_repository, ReservationRepository $reservation_repository)
    {
        $this->mailer = $mailer;
        $this->invoice_repository = $invoice_repository;
        $this->reservation_repository = $reservation_repository;
    }
    /**
     * @Route("/", name="app")
     */
    public function index()
    {
        return $this->render('app/index.html.twig', []);
    }
    /**
     * @Route("/order-confirm/{id}", name="order-confirm", methods={"POST"})
     */
    public function orderConfirm(int $id)
    {
        $invoice = $this->invoice_repository->findOneBy(["id" => $id]);
        $date = new DateTime();
        if ($invoice->getClient()) {
            if ($invoice->getSentAt() >= $date->modify("-2 minutes")) {
                $email = (new TemplatedEmail())
                    ->from($_ENV["MAIL_ADMIN"])
                    ->cc($_ENV["MAIL_ADMIN"])
                    ->to($invoice->getClient()->getEmail())
                    ->subject('Confirmation de commande')
                    ->htmlTemplate('emails/orderConfirmation.html.twig')
                    ->context(['totalAmount' => $invoice->getAmount(), 'orders' => $invoice->getOrders()]);
                $this->mailer->send($email);
                return new Response;
            }
        } else {
            return new Response;
        }
        return $this->redirectToRoute("app");
    }
    /**
     * @Route("/reserve-confirm/{id}", name="reserve-confirm", methods={"POST"})
     */
    public function reserveConfirm(int $id)
    {
        $reservation = $this->reservation_repository->findOneBy(["id" => $id]);
        $encodedid = base64_encode("nb." . $reservation->getPeopleNumber() . "~id@" . $id);
        $date = new DateTime();
        if ($reservation) {
            if ($reservation->getSentAt() >= $date->modify("-2 minutes")) {
                $email = (new TemplatedEmail())
                    ->from($_ENV["MAIL_ADMIN"])
                    ->cc($_ENV["MAIL_ADMIN"])
                    ->to($reservation->getCustomer()->getEmail())
                    ->subject('Confirmation de réservation')
                    ->htmlTemplate('emails/reserveConfirmation.html.twig')
                    ->context([
                        'id' => $reservation->getId(),
                        'encodedid' => $encodedid,
                        'peopleNumber' => $reservation->getPeopleNumber(),
                        'comment' => $reservation->getComment(),
                        'reservationAt' => $reservation->getReservationAt(),
                        'client' => $reservation->getCustomer()
                    ]);
                $this->mailer->send($email);
                return new Response;
            }
        }
        return $this->redirectToRoute("app");
    }
    /**
     * @Route("/reserve/{id}/delete", name="reserve-delete", methods={"GET"})
     */
    public function reserveDelete(string $id, ReservationRepository $reservation_repository)
    {
        $decodedid = base64_decode($id);
        $delete = substr(strstr($decodedid, '@'), 1);
        $reservation = $reservation_repository->find($delete);
        $date = new DateTime();
        if ($reservation) {
            if ($reservation->getReservationAt() >= $date->modify("-30 minutes")) {
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->remove($reservation);
                $entityManager->flush();
                echo ("<h1>Votre réservation a correctement été supprimée</h1>");
            }
        } else {
            return $this->redirectToRoute("app");
        }
        return new Response;
    }

    /**
     * @Route("/pay/{id}",name="pay", methods={"POST"}, schemes={"https"})
     */
    public function paying(int $id): Response
    {
        $invoice = $this->invoice_repository->find($id);
        $orders = "";
        foreach ($invoice->getOrders() as $key) {
            $orders .= " | " . $key->getQuantity() . "x " . $key->getLabel() . " " . $key->getPrice() . "€ \n";
        }
        \Stripe\Stripe::setApiKey("sk_test_51HCndUCDUj22MdGMscmy5f7WOiIB4zVDgd8AHVyDJ6pceA0wx8w0OV2Lpf4HtLtdRCAgvOLFDUIBjkR0tf25gwyD002AdZsgEN");
        $pay = \Stripe\PaymentIntent::create([
            'amount' => $invoice->getAmount() * 100,
            'currency' => 'eur',
            'payment_method_types' => ['card'],
            "description" => "Facture n°" . $invoice->getId() . " \n" . $orders
        ]);

        return $this->json($pay);
    }
}
