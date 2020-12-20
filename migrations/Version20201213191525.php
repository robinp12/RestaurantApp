<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201213191525 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F52993982989F1FD');
        $this->addSql('DROP INDEX IDX_F52993982989F1FD ON `order`');
        $this->addSql('ALTER TABLE `order` ADD total_amount DOUBLE PRECISION NOT NULL, CHANGE invoice_id quantity INT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `order` DROP total_amount, CHANGE quantity invoice_id INT NOT NULL');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F52993982989F1FD FOREIGN KEY (invoice_id) REFERENCES invoice (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_F52993982989F1FD ON `order` (invoice_id)');
    }
}
