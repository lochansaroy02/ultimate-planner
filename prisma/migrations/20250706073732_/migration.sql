/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Year` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Year_title_key" ON "Year"("title");
