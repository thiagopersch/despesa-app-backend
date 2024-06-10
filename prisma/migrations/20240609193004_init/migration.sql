/*
  Warnings:

  - You are about to drop the column `image` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `bank_image` on the `Type_accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Type_accounts" DROP COLUMN "bank_image";
