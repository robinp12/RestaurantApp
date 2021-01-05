<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\InvoiceRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Proxies\__CG__\App\Entity\Product;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"invoices_read"}
 *  }, attributes={"order": {"chrono":"desc"}}
 * )
 * @UniqueEntity("chrono", message="Déjà existant")
 */
class Invoice
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read","orders_read"})
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
     * @Assert\NotBlank(message="Date obligatoire")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"invoices_read","orders_read"})
     * @Assert\NotBlank(message="Obligatoire")
     * @Assert\Choice(choices={"SENT", "PAID","CANCELLED"}, message="Le statut n'est pas valide")
     */
    private $status;

    /**
     * Numero de commande
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="Chrono obligatoire")
     */
    private $chrono;

    /**
     * @ORM\OneToMany(targetEntity=Order::class, mappedBy="invoice")
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="Obligatoire")
     */
    private $orders;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="Date obligatoire")
     */
    private $timeToReceive;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="invoices")
     * @Groups({"invoices_read","orders_read"})
     */
    private $client;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="Obligatoire")
     */
    private $invoiceTable;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
    }

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

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }

    /**
     * @return Collection|Order[]
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders[] = $order;
            $order->setInvoice($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): self
    {
        if ($this->orders->contains($order)) {
            $this->orders->removeElement($order);
            // set the owning side to null (unless already changed)
            if ($order->getInvoice() === $this) {
                $order->setInvoice(null);
            }
        }

        return $this;
    }

    public function getTimeToReceive(): ?\DateTimeInterface
    {
        return $this->timeToReceive;
    }

    public function setTimeToReceive(\DateTimeInterface $timeToReceive): self
    {
        $this->timeToReceive = $timeToReceive;

        return $this;
    }

    public function getClient(): ?Customer
    {
        return $this->client;
    }

    public function setClient(?Customer $client): self
    {
        $this->client = $client;

        return $this;
    }

    public function getInvoiceTable(): ?int
    {
        return $this->invoiceTable;
    }

    public function setInvoiceTable(int $invoiceTable): self
    {
        $this->invoiceTable = $invoiceTable;

        return $this;
    }
}
