<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Reservation;
use App\Repository\CustomerRepository;
use App\Repository\ReservationRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class CustomerReservationSubscriber implements EventSubscriberInterface
{
    private $repositoryCustomer;
    private $mailer;

    public function __construct(CustomerRepository $repositoryCustomer, MailerInterface $mailer)
    {
        $this->repositoryCustomer = $repositoryCustomer;
        $this->mailer = $mailer;
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
            // $email = (new Email())
            //     ->from('test42@gmail.com')
            //     ->to('test42@gmail.com')
            //     //->cc('exemple@mail.com') 
            //     //->bcc('exemple@mail.com')
            //     //->replyTo('test42@gmail.com')
            //     ->priority(Email::PRIORITY_HIGH)
            //     ->subject('I love Me')
            //     // If you want use text mail only
            //     ->text('Lorem ipsum...')
            //     // Raw html
            //     ->html('<h1>Lorem ipsum</h1> <p>...</p>');

            // $this->mailer->send($email);
        }
    }
}
