<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * Encodeur de mot de passe
     *
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        $chrono = 1;

        for($u=0; $u<3;$u++){
            $user = new User();

            $hash = $this->encoder->encodePassword($user, "password");
            $user->setFirstName($faker->firstName())
                 ->setLastName($faker->lastName)
                 ->setEmail($faker->email)
                 ->setPassword($hash);

            $manager->persist($user);
        }
        
        for($i=0; $i<30;$i++){
            $customer = new Customer();
            $customer->setFirstName($faker->firstName())
                     ->setLastName($faker->lastName)
                     ->setPhoneNumber($faker->phoneNumber)
                     ->setEmail($faker->email);

            $manager->persist($customer);

            for($a=0; $a< mt_rand(1,2);$a++){
                $invoice = new Invoice();
                $invoice->setAmount($faker->randomFloat(2,2,300))
                        ->setSentAt($faker->dateTimeBetween('-6 months'))
                        ->setStatus($faker->randomElement(['PAID','CANCELLED','WAITING']))
                        ->setCustomer($customer)
                        ->setChrono($chrono);

                $chrono++;
                $manager->persist($invoice);
            }
        }

        $manager->flush();
    }
}
