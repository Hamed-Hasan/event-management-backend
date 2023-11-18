/*
  Warnings:

  - You are about to drop the column `date` on the `events` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sartDate` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "date",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sartDate" TIMESTAMP(3) NOT NULL;
