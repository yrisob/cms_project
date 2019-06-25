import {MigrationInterface, QueryRunner} from "typeorm";

export class DelPrimaryNamePage1561497781479 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `page_info` DROP FOREIGN KEY `FK_dfe9e3441a4b7faf6f7b2ef5ac9`");
        await queryRunner.query("DROP INDEX `REL_dfe9e3441a4b7faf6f7b2ef5ac` ON `page_info`");
        await queryRunner.query("ALTER TABLE `page_info` DROP COLUMN `pageName`");
        await queryRunner.query("ALTER TABLE `page` CHANGE `id` `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `page` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `page` ADD PRIMARY KEY (`id`)");
        await queryRunner.query("ALTER TABLE `page` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `page` CHANGE `titleImgUrl` `titleImgUrl` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `page_info` ADD UNIQUE INDEX `IDX_7f56661114e9649b4ef9b571e7` (`pageId`)");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_7f56661114e9649b4ef9b571e7` ON `page_info` (`pageId`)");
        await queryRunner.query("ALTER TABLE `page_info` ADD CONSTRAINT `FK_7f56661114e9649b4ef9b571e77` FOREIGN KEY (`pageId`) REFERENCES `page`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `page_info` DROP FOREIGN KEY `FK_7f56661114e9649b4ef9b571e77`");
        await queryRunner.query("DROP INDEX `REL_7f56661114e9649b4ef9b571e7` ON `page_info`");
        await queryRunner.query("ALTER TABLE `page_info` DROP INDEX `IDX_7f56661114e9649b4ef9b571e7`");
        await queryRunner.query("ALTER TABLE `page` CHANGE `titleImgUrl` `titleImgUrl` varchar(255) NOT NULL DEFAULT ''");
        await queryRunner.query("ALTER TABLE `page` CHANGE `id` `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `page` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `page` ADD PRIMARY KEY (`id`, `name`)");
        await queryRunner.query("ALTER TABLE `page` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `page_info` ADD `pageName` varchar(50) NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_dfe9e3441a4b7faf6f7b2ef5ac` ON `page_info` (`pageId`, `pageName`)");
        await queryRunner.query("ALTER TABLE `page_info` ADD CONSTRAINT `FK_dfe9e3441a4b7faf6f7b2ef5ac9` FOREIGN KEY (`pageId`, `pageName`) REFERENCES `page`(`id`,`name`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
