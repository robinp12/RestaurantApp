<?php

namespace App\Entity;

use App\Repository\ReservationRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass=ReservationRepository::class)
 *  @ApiResource(
 *  normalizationContext={
 *      "groups"={"reservations_read"}
 *  }
 * )
 * @UniqueEntity("chrono", message="Déjà existant")
 */
class Reservation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"reservations_read"})
     */
    private $id;

    /**
     * Numero de commande
     * @ORM\Column(type="integer")
     * @Groups({"reservations_read"})
     * @Assert\NotBlank(message="Chrono obligatoire")
     */
    private $chrono;

    /**
     * @ORM\Column(type="string", length=4)
     * @Groups({"reservations_read"})
     * @Assert\NotBlank(message="Obligatoire")
     */
    private $peopleNumber;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"reservations_read"})
     */
    private $comment;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"reservations_read"})
     * @Assert\NotBlank(message="Date obligatoire")
     */
    private $sentAt;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="reservations")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"reservations_read"})
     * @Assert\NotBlank(message="Client obligatoire")
     */
    private $customer;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }

    public function getPeopleNumber(): ?string
    {
        return $this->peopleNumber;
    }

    public function setPeopleNumber(string $peopleNumber): self
    {
        $this->peopleNumber = $peopleNumber;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }
}
