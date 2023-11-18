/*
  Warnings:

  - The primary key for the `faqs` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "faqs" DROP CONSTRAINT "faqs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "faqs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "faqs_id_seq";
