<?php

namespace App\Events;

use DateTime;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Reservation;
use App\Repository\ReservationRepository;
use Symfony\Component\HttpKernel\Event\KernelEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ReservationChronoSubscriber implements EventSubscriberInterface
{

    private $repository;

    public function __construct(ReservationRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForReservation', EventPriorities::PRE_VALIDATE]
        ];
    }
    public function setChronoForReservation(ViewEvent $event)
    {
        $reservation = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if ($reservation instanceof Reservation && $method == "POST") {
            $nextChrono = $this->repository->findNextChrono();
            $reservation->setChrono($nextChrono);
            if (empty($reservation->getSentAt())) {
                $reservation->setSentAt(new \DateTime());
            }
            if (empty($reservation->getReservationAt())) {
                $reservation->setReservationAt(new \DateTime());
            }
        }
    }
}
