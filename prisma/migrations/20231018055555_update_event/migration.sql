/*
  Warnings:

  - You are about to drop the column `sartDate` on the `events` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "sartDate",
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
