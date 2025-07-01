-- DropForeignKey
ALTER TABLE `pet` DROP FOREIGN KEY `Pet_clienteId_fkey`;

-- DropIndex
DROP INDEX `Pet_clienteId_fkey` ON `pet`;

-- AlterTable
ALTER TABLE `pet` ADD COLUMN `ativo` BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
