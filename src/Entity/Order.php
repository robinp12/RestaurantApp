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
 *  }
 * )
 */
class Order
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"orders_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"orders_read"})
     */
    private $orderTable;


    /**
     * @ORM\ManyToOne(targetEntity=Invoice::class, inversedBy="id_order")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"orders_read"})
     * @Assert\NotBlank(message="Obligatoire")
     */
    private $invoice;

    /**
     * @ORM\ManyToMany(targetEntity=Product::class, inversedBy="orders")
     * @Groups({"orders_read"})
     * @Assert\NotBlank(message="Obligatoire")
     */
    private $product;

    public function __construct()
    {
        $this->id_product = new ArrayCollection();
        $this->product = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOrderTable(): ?int
    {
        return $this->orderTable;
    }

    public function setOrderTable(?int $orderTable): self
    {
        $this->orderTable = $orderTable;

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

    /**
     * @return Collection|Product[]
     */
    public function getProduct(): Collection
    {
        return $this->product;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->product->contains($product)) {
            $this->product[] = $product;
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->product->contains($product)) {
            $this->product->removeElement($product);
        }

        return $this;
    }
}
