import { MigrationInterface, QueryRunner } from 'typeorm';

export class cmsMigration1561461717625 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `block` (`id` int NOT NULL AUTO_INCREMENT, `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(50) NOT NULL, `content` text NOT NULL, `imgUrl` varchar(250) NOT NULL, `index` int NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_4896a330611f3b6bc43ec5e020` (`name`), PRIMARY KEY (`id`, `name`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `page` (`id` int NOT NULL AUTO_INCREMENT, `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(50) NOT NULL, `title` varchar(100) NOT NULL, `titleImgUrl` varchar(255) NOT NULL DEFAULT \'\', UNIQUE INDEX `IDX_b82c19c08afb292de4600d99e4` (`name`), PRIMARY KEY (`id`, `name`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `page_info` (`id` int NOT NULL AUTO_INCREMENT, `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `content` text NOT NULL, `index` int NOT NULL, `pageId` int NULL, `pageName` varchar(50) NULL, UNIQUE INDEX `REL_dfe9e3441a4b7faf6f7b2ef5ac` (`pageId`, `pageName`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(100) NOT NULL, `email` varchar(150) NOT NULL, `phone` varchar(12) NOT NULL, `password` varchar(20) NOT NULL, `role` enum (\'0\', \'1\', \'2\', \'3\') NOT NULL DEFAULT \'0\', UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_8e1f623798118e629b46a9e629` (`phone`), PRIMARY KEY (`id`, `email`, `phone`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `page_info_blocks_block` (`pageInfoId` int NOT NULL, `blockId` int NOT NULL, `blockName` varchar(50) NOT NULL, INDEX `IDX_4f962ae79a47d4ff694416b0d0` (`pageInfoId`), INDEX `IDX_a315f0fb6b994649b3e2acbf38` (`blockId`, `blockName`), PRIMARY KEY (`pageInfoId`, `blockId`, `blockName`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `page_info` ADD CONSTRAINT `FK_dfe9e3441a4b7faf6f7b2ef5ac9` FOREIGN KEY (`pageId`, `pageName`) REFERENCES `page`(`id`,`name`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `page_info_blocks_block` ADD CONSTRAINT `FK_4f962ae79a47d4ff694416b0d0d` FOREIGN KEY (`pageInfoId`) REFERENCES `page_info`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `page_info_blocks_block` ADD CONSTRAINT `FK_a315f0fb6b994649b3e2acbf380` FOREIGN KEY (`blockId`, `blockName`) REFERENCES `block`(`id`,`name`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `page_info_blocks_block` DROP FOREIGN KEY `FK_a315f0fb6b994649b3e2acbf380`',
    );
    await queryRunner.query(
      'ALTER TABLE `page_info_blocks_block` DROP FOREIGN KEY `FK_4f962ae79a47d4ff694416b0d0d`',
    );
    await queryRunner.query(
      'ALTER TABLE `page_info` DROP FOREIGN KEY `FK_dfe9e3441a4b7faf6f7b2ef5ac9`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_a315f0fb6b994649b3e2acbf38` ON `page_info_blocks_block`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_4f962ae79a47d4ff694416b0d0` ON `page_info_blocks_block`',
    );
    await queryRunner.query('DROP TABLE `page_info_blocks_block`');
    await queryRunner.query('DROP INDEX `IDX_8e1f623798118e629b46a9e629` ON `user`');
    await queryRunner.query('DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`');
    await queryRunner.query('DROP TABLE `user`');
    await queryRunner.query('DROP INDEX `REL_dfe9e3441a4b7faf6f7b2ef5ac` ON `page_info`');
    await queryRunner.query('DROP TABLE `page_info`');
    await queryRunner.query('DROP INDEX `IDX_b82c19c08afb292de4600d99e4` ON `page`');
    await queryRunner.query('DROP TABLE `page`');
    await queryRunner.query('DROP INDEX `IDX_4896a330611f3b6bc43ec5e020` ON `block`');
    await queryRunner.query('DROP TABLE `block`');
  }
}
