<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201214115905 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice ADD orders_id INT NOT NULL');
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT FK_90651744CFFE9AD6 FOREIGN KEY (orders_id) REFERENCES `order` (id)');
        $this->addSql('CREATE INDEX IDX_90651744CFFE9AD6 ON invoice (orders_id)');
        $this->addSql('ALTER TABLE payment_methode DROP status');
        $this->addSql('ALTER TABLE product DROP quantity');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice DROP FOREIGN KEY FK_90651744CFFE9AD6');
        $this->addSql('DROP INDEX IDX_90651744CFFE9AD6 ON invoice');
        $this->addSql('ALTER TABLE invoice DROP orders_id');
        $this->addSql('ALTER TABLE payment_methode ADD status VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE product ADD quantity INT NOT NULL');
    }
}
