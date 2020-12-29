<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CustomerRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;


/**
 * @ORM\Entity(repositoryClass=CustomerRepository::class)
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"customers_read"}
 *  }
 * )
 * @ApiFilter(SearchFilter::class, properties={"firstName":"partial","lastName":"partial"})
 * @ApiFilter(OrderFilter::class)
 * 
 */
class Customer
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"customers_read","invoices_read","orders_read", "reservations_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"customers_read","invoices_read","orders_read", "reservations_read"})
     * @Assert\Length(min=2, minMessage="Prénom trop court", max=50, maxMessage="Prénom trop long")
     * @Assert\NotBlank(message="Prénom obligatoire")
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"customers_read","invoices_read","orders_read", "reservations_read"})
     * @Assert\Length(min=2, minMessage="Nom trop court", max=50, maxMessage="Nom trop long")
     * @Assert\NotBlank(message="Nom obligatoire")
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"customers_read","invoices_read","orders_read", "reservations_read"})
     * @Assert\NotBlank(message="Email obligatoire")
     * @Assert\Email(message="Format de l'email invalide")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=30)
     * @Groups({"customers_read","invoices_read","orders_read", "reservations_read"})
     * @Assert\Length(min=5, minMessage="Numéro trop court", max=30, maxMessage="Numéro trop long")
     * @Assert\NotBlank(message="Numéro de téléphone obligatoire")
     * @Assert\Type("numeric",message="Format du numéro de téléphone invalide")
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"customers_read","invoices_read","orders_read", "reservations_read"})
     * @Assert\Length(min=5, minMessage="Trop court")
     * @Assert\NotBlank(message="Adresse obligatoire")
     */
    private $address;

    /**
     * @ORM\Column(type="string")
     * @Groups({"customers_read","invoices_read","orders_read", "reservations_read"})
     * @Assert\NotBlank(message="Code postal obligatoire")
     * @Assert\Range(min=1000,max=99999,notInRangeMessage = "Le format du code postal n'est pas valide")
     * @Assert\Type("numeric",message="Format du code postal invalide")
     */
    private $zipcode;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"customers_read","invoices_read","orders_read", "reservations_read"})
     * @Assert\Length(min=2, minMessage="Nom trop court", max=50, maxMessage="Nom trop long")
     * @Assert\NotBlank(message="Ville obligatoire")
     */
    private $city;

    /**
     * @ORM\OneToMany(targetEntity=Reservation::class, mappedBy="customer")
     * @Groups({"customers_read"})
     */
    private $reservations;

    /**
     * @ORM\OneToMany(targetEntity=Invoice::class, mappedBy="client")
     * @Groups({"customers_read"})
     */
    private $invoices;

    public function __construct()
    {
        $this->invoices = new ArrayCollection();
        $this->reservations = new ArrayCollection();
        $this->orders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    /**
     * @return Collection|Reservation[]
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): self
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations[] = $reservation;
            $reservation->setCustomer($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): self
    {
        if ($this->reservations->contains($reservation)) {
            $this->reservations->removeElement($reservation);
            // set the owning side to null (unless already changed)
            if ($reservation->getCustomer() === $this) {
                $reservation->setCustomer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Invoice[]
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices[] = $invoice;
            $invoice->setClient($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoices->contains($invoice)) {
            $this->invoices->removeElement($invoice);
            // set the owning side to null (unless already changed)
            if ($invoice->getClient() === $this) {
                $invoice->setClient(null);
            }
        }

        return $this;
    }
}
