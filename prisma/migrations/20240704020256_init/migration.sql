/*
  Warnings:

  - You are about to drop the column `situation` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `type_repeat` on the `Expense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "situation",
DROP COLUMN "type_repeat";

-- AlterTable
ALTER TABLE "Year" ADD COLUMN     "expenseId" TEXT;

-- CreateTable
CREATE TABLE "Situation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "expenseId" TEXT,

    CONSTRAINT "Situation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Situation_name_key" ON "Situation"("name");

-- AddForeignKey
ALTER TABLE "Year" ADD CONSTRAINT "Year_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Situation" ADD CONSTRAINT "Situation_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;
