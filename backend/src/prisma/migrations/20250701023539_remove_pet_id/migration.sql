/*
  Warnings:

  - You are about to drop the column `petId` on the `consumo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `consumo` DROP FOREIGN KEY `Consumo_petId_fkey`;

-- DropIndex
DROP INDEX `Consumo_petId_fkey` ON `consumo`;

-- AlterTable
ALTER TABLE `consumo` DROP COLUMN `petId`;
