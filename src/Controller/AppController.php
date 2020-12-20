<?php

namespace App\Controller;

use App\Entity\Invoice;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;


class AppController extends AbstractController
{
    /**
     * @Route("/", name="app")
     */
    public function index()
    {
        return $this->render('app/index.html.twig', []);
    }

    public function createInvoice($chrono, $amount, $status, $time_to_receive, $email)
    {
        $em = $this->getDoctrine()->getManager();
        $invoice = new Invoice();
        $invoice->setCustomerEmail($email)
            ->setAmount($amount)
            ->setStatus($status)
            ->setSentAt(new \DateTime())
            ->setChrono($chrono)
            ->setTimeToReceive($time_to_receive);
        if (empty($invoice->getSentAt())) {
            $invoice->setSentAt(new \DateTime());
        }
        $em->persist($invoice);
        $em->flush();
    }
}
