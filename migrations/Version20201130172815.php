<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201130172815 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `order` (id INT AUTO_INCREMENT NOT NULL, invoice_id INT NOT NULL, quantity INT NOT NULL, order_table INT DEFAULT NULL, INDEX IDX_F52993982989F1FD (invoice_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE order_product (order_id INT NOT NULL, product_id INT NOT NULL, INDEX IDX_2530ADE68D9F6D38 (order_id), INDEX IDX_2530ADE64584665A (product_id), PRIMARY KEY(order_id, product_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE payment_methode (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(20) NOT NULL, status VARCHAR(20) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, id_category_id INT NOT NULL, label VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, picture VARCHAR(255) DEFAULT NULL, price DOUBLE PRECISION NOT NULL, INDEX IDX_D34A04ADA545015 (id_category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F52993982989F1FD FOREIGN KEY (invoice_id) REFERENCES invoice (id)');
        $this->addSql('ALTER TABLE order_product ADD CONSTRAINT FK_2530ADE68D9F6D38 FOREIGN KEY (order_id) REFERENCES `order` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE order_product ADD CONSTRAINT FK_2530ADE64584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04ADA545015 FOREIGN KEY (id_category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE customer CHANGE email email VARCHAR(100) NOT NULL, CHANGE phone_number phone_number VARCHAR(15) NOT NULL, CHANGE address address VARCHAR(100) NOT NULL, CHANGE city city VARCHAR(50) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_81398E09E7927C74 ON customer (email)');
        $this->addSql('ALTER TABLE invoice ADD id_payment_id INT NOT NULL, ADD time DATETIME NOT NULL');
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT FK_90651744A149236C FOREIGN KEY (id_payment_id) REFERENCES payment_methode (id)');
        $this->addSql('CREATE INDEX IDX_90651744A149236C ON invoice (id_payment_id)');
        $this->addSql('ALTER TABLE user CHANGE email email VARCHAR(100) NOT NULL, CHANGE address address VARCHAR(100) NOT NULL, CHANGE city city VARCHAR(50) NOT NULL, CHANGE phone_number phone_number VARCHAR(15) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04ADA545015');
        $this->addSql('ALTER TABLE order_product DROP FOREIGN KEY FK_2530ADE68D9F6D38');
        $this->addSql('ALTER TABLE invoice DROP FOREIGN KEY FK_90651744A149236C');
        $this->addSql('ALTER TABLE order_product DROP FOREIGN KEY FK_2530ADE64584665A');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE `order`');
        $this->addSql('DROP TABLE order_product');
        $this->addSql('DROP TABLE payment_methode');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP INDEX UNIQ_81398E09E7927C74 ON customer');
        $this->addSql('ALTER TABLE customer CHANGE email email VARCHAR(180) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE phone_number phone_number VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE address address VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE city city VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('DROP INDEX IDX_90651744A149236C ON invoice');
        $this->addSql('ALTER TABLE invoice DROP id_payment_id, DROP time');
        $this->addSql('ALTER TABLE user CHANGE email email VARCHAR(180) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE address address VARCHAR(150) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE city city VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE phone_number phone_number VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`');
    }
}
