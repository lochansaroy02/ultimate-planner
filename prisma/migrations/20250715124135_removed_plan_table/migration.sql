/*
  Warnings:

  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_userId_fkey";

-- DropForeignKey
ALTER TABLE "Year" DROP CONSTRAINT "Year_planId_fkey";

-- AlterTable
ALTER TABLE "Year" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "Plan";

-- AddForeignKey
ALTER TABLE "Year" ADD CONSTRAINT "Year_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
