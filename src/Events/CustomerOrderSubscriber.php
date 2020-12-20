<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Controller\AppController;
use App\Entity\Customer;
use App\Entity\Order;
use App\Repository\CustomerRepository;
use App\Repository\InvoiceRepository;
use App\Repository\OrderRepository;
use DateTime;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class CustomerOrderSubscriber implements EventSubscriberInterface
{
    private $repository;
    private $repositoryCustomer;
    private $invoice_repository;
    private $app;

    public function __construct(OrderRepository $repository, CustomerRepository $repositoryCustomer, InvoiceRepository $invoice_repository, AppController $app)
    {
        $this->repository = $repository;
        $this->repositoryCustomer = $repositoryCustomer;
        $this->invoice_repository = $invoice_repository;
        $this->app = $app;
    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setCustomerForOrder', EventPriorities::PRE_VALIDATE]
        ];
    }
    public function setCustomerForOrder(ViewEvent $event)
    {
        $customer = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if ($customer instanceof Customer && $method === "POST") {
            // if ($this->repositoryCustomer->findOneBy(["email" => $customer->getEmail()])) {
            // dd("oui");
            // } else {
            // dd("non");

            $nextChrono = $this->invoice_repository->findNextChrono();
            $this->app->createInvoice($nextChrono, 2, "SENT", new DateTime(), $customer->getEmail());
            // }
        }
    }
}
