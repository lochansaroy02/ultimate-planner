/*
  Warnings:

  - The primary key for the `Day` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Goal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Month` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Week` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Year` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `planId` on the `Year` table. All the data in the column will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_weekId_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_dayId_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_monthId_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_weekId_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_yearId_fkey";

-- DropForeignKey
ALTER TABLE "Month" DROP CONSTRAINT "Month_yearId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_dayId_fkey";

-- DropForeignKey
ALTER TABLE "Week" DROP CONSTRAINT "Week_monthId_fkey";

-- DropForeignKey
ALTER TABLE "Year" DROP CONSTRAINT "Year_planId_fkey";

-- AlterTable
ALTER TABLE "Day" DROP CONSTRAINT "Day_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "weekId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Day_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Day_id_seq";

-- AlterTable
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "yearId" SET DATA TYPE TEXT,
ALTER COLUMN "monthId" SET DATA TYPE TEXT,
ALTER COLUMN "weekId" SET DATA TYPE TEXT,
ALTER COLUMN "dayId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Goal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Goal_id_seq";

-- AlterTable
ALTER TABLE "Month" DROP CONSTRAINT "Month_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "yearId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Month_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Month_id_seq";

-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "dayId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Task_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Week" DROP CONSTRAINT "Week_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "monthId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Week_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Week_id_seq";

-- AlterTable
ALTER TABLE "Year" DROP CONSTRAINT "Year_pkey",
DROP COLUMN "planId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Year_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Year_id_seq";

-- DropTable
DROP TABLE "Plan";

-- AddForeignKey
ALTER TABLE "Month" ADD CONSTRAINT "Month_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Week" ADD CONSTRAINT "Week_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;
