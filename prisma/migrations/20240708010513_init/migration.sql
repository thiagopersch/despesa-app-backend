/*
  Warnings:

  - You are about to drop the column `expenseId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `expenseId` on the `Month` table. All the data in the column will be lost.
  - You are about to drop the column `expenseId` on the `Payment_methods` table. All the data in the column will be lost.
  - You are about to drop the column `expenseId` on the `Priority` table. All the data in the column will be lost.
  - You are about to drop the column `expenseId` on the `Situation` table. All the data in the column will be lost.
  - You are about to drop the column `expenseId` on the `Tags` table. All the data in the column will be lost.
  - You are about to drop the column `expenseId` on the `Type_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `expenseId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `expenseId` on the `Year` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priorityId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situationId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagsId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeAccountId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "Month" DROP CONSTRAINT "Month_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "Payment_methods" DROP CONSTRAINT "Payment_methods_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "Priority" DROP CONSTRAINT "Priority_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "Situation" DROP CONSTRAINT "Situation_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "Type_accounts" DROP CONSTRAINT "Type_accounts_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "Year" DROP CONSTRAINT "Year_expenseId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "expenseId";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "monthId" TEXT NOT NULL,
ADD COLUMN     "paymentMethodId" TEXT NOT NULL,
ADD COLUMN     "priorityId" TEXT NOT NULL,
ADD COLUMN     "situationId" TEXT NOT NULL,
ADD COLUMN     "tagsId" TEXT NOT NULL,
ADD COLUMN     "typeAccountId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "yearId" TEXT NOT NULL,
ALTER COLUMN "number_repeat" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Month" DROP COLUMN "expenseId";

-- AlterTable
ALTER TABLE "Payment_methods" DROP COLUMN "expenseId";

-- AlterTable
ALTER TABLE "Priority" DROP COLUMN "expenseId";

-- AlterTable
ALTER TABLE "Situation" DROP COLUMN "expenseId";

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "expenseId";

-- AlterTable
ALTER TABLE "Type_accounts" DROP COLUMN "expenseId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "expenseId";

-- AlterTable
ALTER TABLE "Year" DROP COLUMN "expenseId";

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "Payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "Priority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_typeAccountId_fkey" FOREIGN KEY ("typeAccountId") REFERENCES "Type_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "Situation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
