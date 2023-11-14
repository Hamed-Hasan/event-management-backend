/*
  Warnings:

  - You are about to drop the column `adults` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `children` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `contactNo` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `daysBooked` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "adults",
DROP COLUMN "children",
DROP COLUMN "contactNo",
DROP COLUMN "daysBooked",
DROP COLUMN "email",
DROP COLUMN "totalAmount";
