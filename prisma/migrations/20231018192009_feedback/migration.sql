-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "endDate" DROP DEFAULT,
ALTER COLUMN "startDate" DROP DEFAULT;

-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
