/*
  Warnings:

  - Added the required column `userId` to the `blog_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
