/*
  Warnings:

  - The primary key for the `diary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `diary_id` on the `diary` table. All the data in the column will be lost.
  - The primary key for the `exercises` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `exercise_id` on the `exercises` table. All the data in the column will be lost.
  - The primary key for the `food` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `food_id` on the `food` table. All the data in the column will be lost.
  - The primary key for the `sets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `set_id` on the `sets` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `users` table. All the data in the column will be lost.
  - The primary key for the `workout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `workout_id` on the `workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "diary" DROP CONSTRAINT "diary_user_id_fkey";

-- DropForeignKey
ALTER TABLE "food_entry" DROP CONSTRAINT "food_entry_diary_id_fkey";

-- DropForeignKey
ALTER TABLE "food_entry" DROP CONSTRAINT "food_entry_food_id_fkey";

-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_user_id_fkey";

-- DropForeignKey
ALTER TABLE "workout" DROP CONSTRAINT "workout_user_id_fkey";

-- DropForeignKey
ALTER TABLE "workout_exercises" DROP CONSTRAINT "workout_exercises_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "workout_exercises" DROP CONSTRAINT "workout_exercises_workout_id_fkey";

-- AlterTable
ALTER TABLE "diary" DROP CONSTRAINT "diary_pkey",
DROP COLUMN "diary_id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "diary_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_pkey",
DROP COLUMN "exercise_id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "exercises_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "food" DROP CONSTRAINT "food_pkey",
DROP COLUMN "food_id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "food_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sets" DROP CONSTRAINT "sets_pkey",
DROP COLUMN "set_id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "sets_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "workout" DROP CONSTRAINT "workout_pkey",
DROP COLUMN "workout_id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "workout_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "diary" ADD CONSTRAINT "diary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "food_entry" ADD CONSTRAINT "food_entry_diary_id_fkey" FOREIGN KEY ("diary_id") REFERENCES "diary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "food_entry" ADD CONSTRAINT "food_entry_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "food"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "workout" ADD CONSTRAINT "workout_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
