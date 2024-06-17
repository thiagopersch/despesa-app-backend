/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Module` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Month` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Payment_methods` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Priority` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bank_name]` on the table `Type_accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[year]` on the table `Year` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Module_code_key" ON "Module"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Month_name_key" ON "Month"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_methods_name_key" ON "Payment_methods"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Priority_name_key" ON "Priority"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_code_key" ON "Profile"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Type_accounts_bank_name_key" ON "Type_accounts"("bank_name");

-- CreateIndex
CREATE UNIQUE INDEX "Year_year_key" ON "Year"("year");
