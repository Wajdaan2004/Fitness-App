-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."diary" (
    "diary_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "date" DATE,
    "calorie_goal" DECIMAL(7,2),
    "fat_goal" DECIMAL(6,2),
    "carb_goal" DECIMAL(6,2),
    "protein_goal" DECIMAL(6,2),

    CONSTRAINT "diary_pkey" PRIMARY KEY ("diary_id")
);

-- CreateTable
CREATE TABLE "public"."exercises" (
    "exercise_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "primary_muscle" TEXT,
    "secondary_muscle" TEXT[],

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("exercise_id")
);

-- CreateTable
CREATE TABLE "public"."food" (
    "food_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "calories" SMALLINT,
    "protein" SMALLINT,
    "carbs" SMALLINT,
    "fat" SMALLINT,
    "micronutrients" JSONB,

    CONSTRAINT "food_pkey" PRIMARY KEY ("food_id")
);

-- CreateTable
CREATE TABLE "public"."food_entry" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "diary_id" UUID,
    "food_id" UUID,
    "serving_amount" DECIMAL(5,2),
    "serving_unit" VARCHAR(20),

    CONSTRAINT "food_entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sets" (
    "set_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workout_exercise_id" UUID,
    "set_number" INTEGER,
    "reps" INTEGER,
    "weight" DECIMAL(6,2),

    CONSTRAINT "sets_pkey" PRIMARY KEY ("set_id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "birthday" DATE,
    "email" TEXT,
    "number" VARCHAR(20),
    "password" VARCHAR(20),
    "username" VARCHAR(30),
    "is_deleted" BOOLEAN DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."workout" (
    "workout_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "date" DATE,

    CONSTRAINT "workout_pkey" PRIMARY KEY ("workout_id")
);

-- CreateTable
CREATE TABLE "public"."workout_exercises" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workout_id" UUID,
    "exercise_id" UUID,

    CONSTRAINT "workout_exercises_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email" ASC);

-- AddForeignKey
ALTER TABLE "public"."diary" ADD CONSTRAINT "diary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."food_entry" ADD CONSTRAINT "food_entry_diary_id_fkey" FOREIGN KEY ("diary_id") REFERENCES "public"."diary"("diary_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."food_entry" ADD CONSTRAINT "food_entry_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "public"."food"("food_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sets" ADD CONSTRAINT "sets_workout_exercise_id_fkey" FOREIGN KEY ("workout_exercise_id") REFERENCES "public"."workout_exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."workout" ADD CONSTRAINT "workout_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."workout_exercises" ADD CONSTRAINT "workout_exercises_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("exercise_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."workout_exercises" ADD CONSTRAINT "workout_exercises_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "public"."workout"("workout_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
