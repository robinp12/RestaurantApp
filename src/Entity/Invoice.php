<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\InvoiceRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;


use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"invoices_read"}
 *  }, attributes={"order": {"chrono":"desc"}}
 * )
 */
class Invoice
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="Montant obligatoire")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoices_read"})
     * @Assert\DateTime
     * @var string A "Y-m-d H:i:s" formatted value
     * @Assert\NotBlank(message="Date obligatoire")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="Status obligatoire")
     * @Assert\Choice(choices={"SENT", "PAID","CANCELLED"}, message="Le statut n'est pas valide")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="Client obligatoire")
     */
    private $customer;

    /**
     * Numero de commande
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read"})
     */
    private $chrono;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

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

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
