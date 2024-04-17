-- CreateTable
CREATE TABLE `Customer` (
    `custId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`custId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `proId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `unit` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`proId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `orId` INTEGER NOT NULL AUTO_INCREMENT,
    `orderAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `totOrder` INTEGER NOT NULL,
    `discount` INTEGER NOT NULL,
    `CustId` INTEGER NOT NULL,

    PRIMARY KEY (`orId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailOrder` (
    `detailOrderId` INTEGER NOT NULL AUTO_INCREMENT,
    `OrId` INTEGER NOT NULL,
    `OrderUnit` INTEGER NOT NULL,
    `ProId` INTEGER NOT NULL,

    PRIMARY KEY (`detailOrderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_CustId_fkey` FOREIGN KEY (`CustId`) REFERENCES `Customer`(`custId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailOrder` ADD CONSTRAINT `DetailOrder_OrId_fkey` FOREIGN KEY (`OrId`) REFERENCES `Order`(`orId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailOrder` ADD CONSTRAINT `DetailOrder_ProId_fkey` FOREIGN KEY (`ProId`) REFERENCES `Product`(`proId`) ON DELETE RESTRICT ON UPDATE CASCADE;
