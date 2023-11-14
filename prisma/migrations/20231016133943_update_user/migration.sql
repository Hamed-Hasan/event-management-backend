-- AlterTable
ALTER TABLE "events" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '221baa54-a456-45bc-8721-db002a303a3d';

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
