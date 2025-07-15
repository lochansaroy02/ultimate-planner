/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Day` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Month` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Day_title_key" ON "Day"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Month_title_key" ON "Month"("title");
