/*
  Warnings:

  - Added the required column `contactNo` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `daysBooked` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "adults" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "children" INTEGER,
ADD COLUMN     "contactNo" TEXT NOT NULL,
ADD COLUMN     "daysBooked" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL;
