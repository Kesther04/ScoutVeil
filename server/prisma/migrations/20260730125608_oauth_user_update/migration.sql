/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('PASSWORD', 'GOOGLE');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "authProvider" "AuthProvider" NOT NULL DEFAULT 'PASSWORD',
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "profileIncomplete" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "passwordHash" DROP NOT NULL,
ALTER COLUMN "companyName" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");
