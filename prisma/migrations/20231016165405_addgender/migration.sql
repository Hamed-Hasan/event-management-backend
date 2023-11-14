-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'others');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'male';
