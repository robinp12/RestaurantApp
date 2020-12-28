<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Controller\AppController;
use App\Entity\Customer;
use App\Entity\Order;
use App\Repository\CustomerRepository;
use App\Repository\InvoiceRepository;
use DateTime;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mailer\MailerInterface;

class OrderInvoiceSubscriber implements EventSubscriberInterface
{
    private $invoice_repository;
    private $customerRepository;
    private $app;

    public function __construct(InvoiceRepository $invoice_repository, AppController $app, CustomerRepository $customerRepository)
    {
        $this->invoice_repository = $invoice_repository;
        $this->customerRepository = $customerRepository;
        $this->app = $app;
    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setInvoiceForOrder', EventPriorities::PRE_VALIDATE]
        ];
    }
    public function setInvoiceForOrder(ViewEvent $event)
    {
        $order = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if ($order instanceof Order && $method === "POST") {
            $order_customer_email = $order->getCustomerEmail();
            $order_table = $order->getOrderTable();
            if ($order_table) {
                $this_invoice =  $this->invoice_repository->findOneBy(["invoiceTable" => $order_table], ["id" => "DESC"]);
                $this_invoice->setAmount($this_invoice->getAmount() + $order->getTotalAmount());
                $this_invoice->addOrder($order);
                $this_invoice->setInvoiceTable($order_table);
            } else {
                // Si l'email de la commande est lié à un client existant
                if ($this->invoice_repository->findOneBy(["customer_email" => $order_customer_email])) {
                    $this_customer = $this->customerRepository->findOneBy(["email" => $order_customer_email], ["id" => "DESC"]);
                    $this_invoice =  $this->invoice_repository->findOneBy(["customer_email" => $order_customer_email], ["id" => "DESC"]);
                    $this_invoice->setAmount($this_invoice->getAmount() + $order->getTotalAmount());
                    $this_invoice->addOrder($order);
                    $this_invoice->setClient($this_customer);
                } else {
                    dd("Client non existant pour cet email, impossible de créer une commande");
                }
            }
        }
    }
}
