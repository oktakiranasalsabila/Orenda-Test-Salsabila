/*
  Warnings:

  - Made the column `name` on table `customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `customer` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `name` VARCHAR(191) NOT NULL;
