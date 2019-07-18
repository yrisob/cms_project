import {MigrationInterface, QueryRunner} from "typeorm";

export class menuMigration1563448601841 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `menu` CHANGE `isMainPage` `orderNumber` tinyint NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `menu` DROP COLUMN `orderNumber`");
        await queryRunner.query("ALTER TABLE `menu` ADD `orderNumber` int NOT NULL DEFAULT 10");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `menu` DROP COLUMN `orderNumber`");
        await queryRunner.query("ALTER TABLE `menu` ADD `orderNumber` tinyint NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `menu` CHANGE `orderNumber` `isMainPage` tinyint NOT NULL DEFAULT '0'");
    }

}
