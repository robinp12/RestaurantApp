<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201214120657 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice DROP FOREIGN KEY FK_90651744CFFE9AD6');
        $this->addSql('DROP INDEX IDX_90651744CFFE9AD6 ON invoice');
        $this->addSql('ALTER TABLE invoice DROP orders_id');
        $this->addSql('ALTER TABLE `order` ADD invoice_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F52993982989F1FD FOREIGN KEY (invoice_id) REFERENCES invoice (id)');
        $this->addSql('CREATE INDEX IDX_F52993982989F1FD ON `order` (invoice_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice ADD orders_id INT NOT NULL');
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT FK_90651744CFFE9AD6 FOREIGN KEY (orders_id) REFERENCES `order` (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_90651744CFFE9AD6 ON invoice (orders_id)');
        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F52993982989F1FD');
        $this->addSql('DROP INDEX IDX_F52993982989F1FD ON `order`');
        $this->addSql('ALTER TABLE `order` DROP invoice_id');
    }
}
