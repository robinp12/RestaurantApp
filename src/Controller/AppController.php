<?php

namespace App\Controller;

use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mime\Email;



class AppController extends AbstractController
{

    private $mailer;
    private $invoice_repository;


    public function __construct(MailerInterface $mailer, InvoiceRepository $invoice_repository)
    {
        $this->mailer = $mailer;
        $this->invoice_repository = $invoice_repository;
    }
    /**
     * @Route("/", name="app")
     */
    public function index()
    {
        return $this->render('app/index.html.twig', []);
    }
    /**
     * @Route("/confirmation", name="confirm")
     */
    public function confirm()
    {

        $email = "robin-be@hotmail.com";

        if ($this->invoice_repository->findOneBy(["customer_email" => $email])) {
            // // $this_customer = $this->customerRepository->findOneBy(["email" => $email], ["id" => "DESC"]);
            // $this_invoice =  $this->invoice_repository->findOneBy(["customer_email" => $email], ["id" => "DESC"]);

            // foreach ($this_invoice->getOrders() as $value) {
            //     "<tr><td>" . $value->getLabel() . "</td><td>" . $value->getQuantity() . "</td><td>" . $value->getPrice() . " €</td><td></td></tr>";
            // }
            // dump($this_invoice);
            // $email = (new TemplatedEmail())
            //     ->from('admin@shop-lechevalblanc.be')
            //     ->to($email)
            //     ->priority(Email::PRIORITY_HIGH)
            //     ->subject('Confirmation de commande')
            //     ->htmlTemplate('emails/confirmation.html.twig')
            //     ->context(['totalAmount' => $this_invoice->getAmount(), 'orders' => $this_invoice->getOrders()]);

            // $this->mailer->send($email);
            dd("Mail envoyé");
        }
    }
}
