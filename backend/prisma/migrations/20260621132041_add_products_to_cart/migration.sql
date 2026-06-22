-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_modId_fkey`;

-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `productId` INTEGER NULL,
    MODIFY `modId` INTEGER NULL,
    ALTER COLUMN `quantity` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_modId_fkey` FOREIGN KEY (`modId`) REFERENCES `Mod`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
