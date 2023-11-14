/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_password_key" ON "users"("password");
