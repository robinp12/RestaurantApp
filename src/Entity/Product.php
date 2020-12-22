<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;



/**
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"product_read"}
 *  }
 * )
 */
class Product
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"product_read","category_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"product_read","category_read","orders_read","invoices_read"})
     * @Assert\NotBlank(message="Nom obligatoire")
     */
    private $label;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"product_read","category_read"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"product_read","category_read"})
     */
    private $picture;

    /**
     * @ORM\Column(type="string")
     * @Groups({"product_read","category_read","orders_read"})
     * @Assert\NotBlank(message="Prix obligatoire")
     * @Assert\Type("numeric",message="Format incorrect")
     */
    private $price;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="products")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"product_read"})
     * @Assert\NotBlank(message="Catégorie obligatoire")
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity=Detail::class, inversedBy="product")
     * @Groups({"product_read"})
     */
    private $detail;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(?string $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getDetail(): ?Detail
    {
        return $this->detail;
    }

    public function setDetail(?Detail $detail): self
    {
        $this->detail = $detail;

        return $this;
    }
}
