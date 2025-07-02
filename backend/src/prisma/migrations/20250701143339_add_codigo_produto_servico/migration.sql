/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `ProdutoServico` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo` to the `ProdutoServico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produtoservico` ADD COLUMN `codigo` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ProdutoServico_codigo_key` ON `ProdutoServico`(`codigo`);
