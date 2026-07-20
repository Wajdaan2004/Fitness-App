/*
  Warnings:

  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "workout" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
