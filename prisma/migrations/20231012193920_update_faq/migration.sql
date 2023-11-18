/*
  Warnings:

  - Added the required column `userId` to the `faqs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "faqs" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
