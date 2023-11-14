/*
  Warnings:

  - You are about to drop the `_CategoryToEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToEvent" DROP CONSTRAINT "_CategoryToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToEvent" DROP CONSTRAINT "_CategoryToEvent_B_fkey";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "categoryId" TEXT NOT NULL DEFAULT '4d6a3195-026d-46a0-aba9-1e217ab23e5a';

-- DropTable
DROP TABLE "_CategoryToEvent";

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
