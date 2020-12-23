<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Reservation;
use App\Repository\CustomerRepository;
use App\Repository\ReservationRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class CustomerReservationSubscriber implements EventSubscriberInterface
{
    private $repositoryCustomer;

    public function __construct(CustomerRepository $repositoryCustomer)
    {
        $this->repositoryCustomer = $repositoryCustomer;
    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setCustomerForReservation', EventPriorities::PRE_VALIDATE]
        ];
    }
    public function setCustomerForReservation(ViewEvent $event)
    {
        $reservation = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if ($reservation instanceof Reservation && $method === "POST") {
            $reservation_customer_email = $reservation->getCustomerEmail();
            // Si l'email de la réservation est lié à un client existant
            if ($this->repositoryCustomer->findOneBy(["email" => $reservation_customer_email])) {
                $this_customer = $this->repositoryCustomer->findOneBy(["email" => $reservation_customer_email], ["id" => "DESC"]);
                $reservation->setCustomer($this_customer);
            } else {
                dd("Client non existant pour cet email, impossible de créer une reservation");
            }
        }
    }
}
