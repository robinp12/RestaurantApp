<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{
    public function updateJwtData(JWTCreatedEvent $event)
    {
        $user = $event->getUser();
        $data = $event->getData();
        $data['id'] = $user->getId();
        $data['roles'] = $user->getRoles();
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();
        $data['address'] = $user->getAddress();
        $data['zipcode'] = $user->getZipcode();
        $data['city'] = $user->getCity();
        $data['phoneNumber'] = $user->getPhoneNumber();

        $event->setData($data);
    }
}
