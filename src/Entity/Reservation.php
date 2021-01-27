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
 *  }, attributes={"order": {"id":"desc"}}
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
     * @ORM\Column(type="integer", length=4)
     * @Groups({"reservations_read"})
     * @Assert\NotBlank(message="Obligatoire")
     * @Assert\Range(
     *      min = 1,
     *      max = 20,
     *      notInRangeMessage = "La réservation n'est possible qu'entre {{ min }} et {{ max }} personnes",
     * )
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
     * @Groups({"reservations_read"})
     */
    private $customer;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"reservations_read"})
     * @Assert\NotBlank(message="Date obligatoire")
     * @Assert\GreaterThanOrEqual(
     *      value = "1 day",
     *      message = "Disponible seulement au dela des 24 heures"
     * )
     */
    private $reservation_at;

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

    public function getPeopleNumber(): ?int
    {
        return $this->peopleNumber;
    }

    public function setPeopleNumber(int $peopleNumber): self
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

    public function getReservationAt(): ?\DateTimeInterface
    {
        return $this->reservation_at;
    }

    public function setReservationAt(\DateTimeInterface $reservation_at): self
    {
        $this->reservation_at = $reservation_at;

        return $this;
    }
}
