<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Customer;
use App\Entity\Reservation;
use App\Repository\CustomerRepository;
use App\Repository\ReservationRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class ExistingCustomerSubscriber implements EventSubscriberInterface
{
    private $repositoryCustomer;

    public function __construct(CustomerRepository $repositoryCustomer)
    {
        $this->repositoryCustomer = $repositoryCustomer;
    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setExistingCustomer', EventPriorities::PRE_VALIDATE]
        ];
    }
    public function setExistingCustomer(ViewEvent $event)
    {
        $customer = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if ($customer instanceof Customer && $method === "POST") {
            $customerEmail = $customer->getEmail();
            $existingCustomer = $this->repositoryCustomer->findOneBy(["email" => $customerEmail]);
            // Si l'email existe deja, on met les informations du client a jour.
            if ($existingCustomer) {
                $existingCustomer->setFirstName($customer->getFirstName());
                $existingCustomer->setLastName($customer->getLastName());
                $existingCustomer->setPhoneNumber($customer->getPhoneNumber());
                $existingCustomer->setAddress($customer->getAddress());
                $existingCustomer->setCity($customer->getCity());
                $existingCustomer->setZipcode($customer->getZipcode());
                $event->setControllerResult($existingCustomer);
            }
        }
    }
}
