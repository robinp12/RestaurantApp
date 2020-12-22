<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=OrderRepository::class)
 * @ORM\Table(name="`order`")
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"orders_read"}
 *  }, attributes={"order": {"id":"desc"}}
 * )
 */
class Order
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"orders_read","invoices_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"orders_read","invoices_read"})
     * @Assert\NotBlank(message="Obligatoire")
     */
    private $label;

    /**
     * @ORM\Column(type="float")
     * @Groups({"orders_read","invoices_read"})
     * @Assert\NotBlank(message="Obligatoire")
     */
    private $price;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"orders_read","invoices_read"})
     * @Assert\NotBlank(message="Invalide")
     * @Assert\Positive(message="Quantité invalide")
     */
    private $quantity;

    /**
     * @ORM\Column(type="float")
     * @Groups({"orders_read","invoices_read"})
     * @Assert\NotBlank(message="Obligatoire")
     * @Assert\PositiveOrZero(message="Invalide")
     */
    private $totalAmount;

    /**
     * @ORM\ManyToOne(targetEntity=Invoice::class, inversedBy="orders")
     */
    private $invoice;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"orders_read","invoices_read"})
     * @Assert\NotBlank(message="Obligatoire")
     */
    private $customer_email;

    public function __construct()
    {
        $this->id_product = new ArrayCollection();
        $this->product = new ArrayCollection();
        $this->invoices = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getTotalAmount(): ?float
    {
        return $this->totalAmount;
    }

    public function setTotalAmount(float $totalAmount): self
    {
        $this->totalAmount = $totalAmount;

        return $this;
    }

    public function getInvoice(): ?Invoice
    {
        return $this->invoice;
    }

    public function setInvoice(?Invoice $invoice): self
    {
        $this->invoice = $invoice;

        return $this;
    }

    public function getCustomerEmail(): ?string
    {
        return $this->customer_email;
    }

    public function setCustomerEmail(string $customer_email): self
    {
        $this->customer_email = $customer_email;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }
}
