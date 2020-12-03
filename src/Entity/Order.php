<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;


/**
 * @ORM\Entity(repositoryClass=OrderRepository::class)
 * @ORM\Table(name="`order`")
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"order_read"}
 *  }
 * )
 */
class Order
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $quantity;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $orderTable;

    /**
     * @ORM\ManyToMany(targetEntity=Product::class)
     */
    private $id_product;

    /**
     * @ORM\ManyToOne(targetEntity=Invoice::class, inversedBy="id_order")
     * @ORM\JoinColumn(nullable=false)
     */
    private $invoice;

    public function __construct()
    {
        $this->id_product = new ArrayCollection();
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

    public function getOrderTable(): ?int
    {
        return $this->orderTable;
    }

    public function setOrderTable(?int $orderTable): self
    {
        $this->orderTable = $orderTable;

        return $this;
    }

    /**
     * @return Collection|Product[]
     */
    public function getIdProduct(): Collection
    {
        return $this->id_product;
    }

    public function addIdProduct(Product $idProduct): self
    {
        if (!$this->id_product->contains($idProduct)) {
            $this->id_product[] = $idProduct;
        }

        return $this;
    }

    public function removeIdProduct(Product $idProduct): self
    {
        if ($this->id_product->contains($idProduct)) {
            $this->id_product->removeElement($idProduct);
        }

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
}
