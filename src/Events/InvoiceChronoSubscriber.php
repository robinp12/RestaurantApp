<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use DateTime;
use Symfony\Component\HttpKernel\Event\KernelEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class InvoiceChronoSubscriber implements EventSubscriberInterface
{

    private $repository;

    public function __construct(InvoiceRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }
    public function setChronoForInvoice(ViewEvent $event)
    {
        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if ($invoice instanceof Invoice && $method == "POST") {
            $nextChrono = $this->repository->findNextChrono();
            $invoice->setChrono($nextChrono);
            if (empty($invoice->getSentAt())) {
                $invoice->setSentAt(new \DateTime());
            }
        }
    }
}
