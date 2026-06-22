-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_modId_fkey`;

-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `productId` INTEGER NULL,
    MODIFY `modId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_modId_fkey` FOREIGN KEY (`modId`) REFERENCES `Mod`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
