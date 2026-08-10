/*
  Warnings:

  - A unique constraint covering the columns `[user_id,date]` on the table `diary` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `goals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "goals" ADD COLUMN     "date" DATE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "diary_user_id_date_key" ON "diary"("user_id", "date");
