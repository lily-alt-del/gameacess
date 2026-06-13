/*
  Warnings:

  - You are about to drop the column `productId` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `orderitem` table. All the data in the column will be lost.
  - Added the required column `modId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_productId_fkey`;

-- AlterTable
ALTER TABLE `cartitem` DROP COLUMN `productId`,
    ADD COLUMN `modId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `orderitem` DROP COLUMN `productId`,
    ADD COLUMN `modId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_modId_fkey` FOREIGN KEY (`modId`) REFERENCES `Mod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_modId_fkey` FOREIGN KEY (`modId`) REFERENCES `Mod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
