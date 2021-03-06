<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass=UserRepository::class) 
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"users_read"}
 *  }
 * )
 * @UniqueEntity("email", message="Email déjà existant")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100, unique=true)
     * @Groups({"users_read"})
     * @Assert\NotBlank(message="Email obligatoire")
     * @Assert\Email(message="Le format de l'adresse mail est invalide")
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"users_read"})
     * @Assert\NotBlank(message="Rôle obligatoire")
     * @Assert\Type("array",message="Rôle obligatoire")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\Length(min=6, minMessage="Le mot de passe doit contenir minimum 5 caractères")
     * @Assert\NotBlank(message="Mot de passe obligatoire")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"users_read"})
     * @Assert\Length(min=2, minMessage="Le prénom doit contenir au moins 2 caractères", max=50, maxMessage="Prénom trop long")
     * @Assert\NotBlank(message="Prénom obligatoire")
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"users_read"})
     * @Assert\Length(min=2, minMessage="Le nom doit contenir au moins 2 caractères", max=50, maxMessage="Nom trop long")
     * @Assert\NotBlank(message="Nom obligatoire")
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"users_read"})
     * @Assert\Length(min=5, minMessage="L'adresse doit contenir au moins 5 caractères")
     * @Assert\NotBlank(message="Adresse obligatoire")
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=6)
     * @Groups({"users_read"})
     * @Assert\NotBlank(message="Code postal obligatoire")
     * @Assert\Length(min=4,max=6,minMessage = "Le code postal doit contenir au moins 4 caractères",maxMessage = "Le code postal peut contenir au maximum 6 caractères")
     * @Assert\Type("numeric",message="Le format doit être numérique")
     */
    private $zipcode;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"users_read"})
     * @Assert\Length(min=2, minMessage="La ville doit contenir au moins 2 caractères", max=50, maxMessage="Nom trop long")
     * @Assert\NotBlank(message="Ville obligatoire")
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=15)
     * @Groups({"users_read"})
     * @Assert\Length(min=8, minMessage="Le numéro de télephone doit contenir au moins 8 chiffres", max=15, maxMessage="Le numéro de télephone peut contenir au maximum 15 chiffres")
     * @Assert\NotBlank(message="Numéro de téléphone obligatoire")
     * @Assert\Type("numeric",message="Le format doit être de type numérique")
     */
    private $phoneNumber;

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        // $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }
}
