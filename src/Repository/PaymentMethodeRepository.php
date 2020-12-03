<?php

namespace App\Repository;

use App\Entity\PaymentMethode;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PaymentMethode|null find($id, $lockMode = null, $lockVersion = null)
 * @method PaymentMethode|null findOneBy(array $criteria, array $orderBy = null)
 * @method PaymentMethode[]    findAll()
 * @method PaymentMethode[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PaymentMethodeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PaymentMethode::class);
    }

    // /**
    //  * @return PaymentMethode[] Returns an array of PaymentMethode objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PaymentMethode
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
