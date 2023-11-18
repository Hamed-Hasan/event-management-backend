/*
  Warnings:

  - Made the column `children` on table `bookings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "children" SET NOT NULL,
ALTER COLUMN "children" SET DEFAULT 0;
