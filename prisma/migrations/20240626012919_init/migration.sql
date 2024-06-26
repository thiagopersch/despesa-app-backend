/*
  Warnings:

  - You are about to drop the column `yearId` on the `Month` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Month" DROP CONSTRAINT "Month_yearId_fkey";

-- AlterTable
ALTER TABLE "Month" DROP COLUMN "yearId";
