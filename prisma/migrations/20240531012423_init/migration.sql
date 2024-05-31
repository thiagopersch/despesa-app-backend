/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bank_code]` on the table `Type_accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bank_code` to the `Type_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Type_accounts" ADD COLUMN     "bank_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type_accounts_bank_code_key" ON "Type_accounts"("bank_code");
