/*
  Warnings:

  - You are about to drop the column `goal` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `Month` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Month` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `Week` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Week` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `Year` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Year` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Day" DROP COLUMN "goal",
DROP COLUMN "isCompleted";

-- AlterTable
ALTER TABLE "Month" DROP COLUMN "goal",
DROP COLUMN "isCompleted";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "goal";

-- AlterTable
ALTER TABLE "Week" DROP COLUMN "goal",
DROP COLUMN "isCompleted";

-- AlterTable
ALTER TABLE "Year" DROP COLUMN "goal",
DROP COLUMN "isCompleted";

-- CreateTable
CREATE TABLE "Goal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "yearId" INTEGER,
    "monthId" INTEGER,
    "weekId" INTEGER,
    "dayId" INTEGER,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;
