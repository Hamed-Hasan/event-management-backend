/*
  Warnings:

  - You are about to drop the column `children` on the `bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "children",
ADD COLUMN     "childrens" INTEGER NOT NULL DEFAULT 0;
