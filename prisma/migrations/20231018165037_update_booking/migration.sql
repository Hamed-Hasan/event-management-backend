/*
  Warnings:

  - You are about to drop the column `date` on the `bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "date",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL DEFAULT '2023-11-05 07:08:57.833 +00:00',
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT '2023-11-01 07:08:57.833 +00:00';
