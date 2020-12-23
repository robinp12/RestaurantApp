<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201223160006 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT FK_9065174419EB6921 FOREIGN KEY (client_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F52993982989F1FD FOREIGN KEY (invoice_id) REFERENCES invoice (id)');
        $this->addSql('ALTER TABLE product CHANGE price price VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD12469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04ADD8D003BB FOREIGN KEY (detail_id) REFERENCES detail (id)');
        $this->addSql('ALTER TABLE reservation CHANGE customer_id customer_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C849559395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE user CHANGE zipcode zipcode VARCHAR(6) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice DROP FOREIGN KEY FK_9065174419EB6921');
        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F52993982989F1FD');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD12469DE2');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04ADD8D003BB');
        $this->addSql('ALTER TABLE product CHANGE price price DOUBLE PRECISION NOT NULL');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C849559395C3F3');
        $this->addSql('ALTER TABLE reservation CHANGE customer_id customer_id INT NOT NULL');
        $this->addSql('ALTER TABLE user CHANGE zipcode zipcode VARCHAR(4) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`');
    }
}
