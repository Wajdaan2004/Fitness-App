/*
  Warnings:

  - You are about to drop the column `calorie_goal` on the `diary` table. All the data in the column will be lost.
  - You are about to drop the column `carb_goal` on the `diary` table. All the data in the column will be lost.
  - You are about to drop the column `fat_goal` on the `diary` table. All the data in the column will be lost.
  - You are about to drop the column `protein_goal` on the `diary` table. All the data in the column will be lost.
  - Made the column `user_id` on table `diary` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `diary` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `exercises` required. This step will fail if there are existing NULL values in that column.
  - Made the column `primary_muscle` on table `exercises` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `calories` on table `food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `protein` on table `food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carbs` on table `food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fat` on table `food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `diary_id` on table `food_entry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `food_id` on table `food_entry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `serving_amount` on table `food_entry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `serving_unit` on table `food_entry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `goals` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workout_exercise_id` on table `sets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `set_number` on table `sets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reps` on table `sets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `sets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthday` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_deleted` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `workout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `workout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workout_id` on table `workout_exercises` required. This step will fail if there are existing NULL values in that column.
  - Made the column `exercise_id` on table `workout_exercises` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "diary" DROP COLUMN "calorie_goal",
DROP COLUMN "carb_goal",
DROP COLUMN "fat_goal",
DROP COLUMN "protein_goal",
ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "date" SET NOT NULL;

-- AlterTable
ALTER TABLE "exercises" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "primary_muscle" SET NOT NULL;

-- AlterTable
ALTER TABLE "food" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "calories" SET NOT NULL,
ALTER COLUMN "protein" SET NOT NULL,
ALTER COLUMN "carbs" SET NOT NULL,
ALTER COLUMN "fat" SET NOT NULL;

-- AlterTable
ALTER TABLE "food_entry" ALTER COLUMN "diary_id" SET NOT NULL,
ALTER COLUMN "food_id" SET NOT NULL,
ALTER COLUMN "serving_amount" SET NOT NULL,
ALTER COLUMN "serving_unit" SET NOT NULL;

-- AlterTable
ALTER TABLE "goals" ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "sets" ALTER COLUMN "workout_exercise_id" SET NOT NULL,
ALTER COLUMN "set_number" SET NOT NULL,
ALTER COLUMN "reps" SET NOT NULL,
ALTER COLUMN "weight" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "birthday" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "is_deleted" SET NOT NULL;

-- AlterTable
ALTER TABLE "workout" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "date" SET NOT NULL;

-- AlterTable
ALTER TABLE "workout_exercises" ALTER COLUMN "workout_id" SET NOT NULL,
ALTER COLUMN "exercise_id" SET NOT NULL;
