/*
  Warnings:

  - A unique constraint covering the columns `[name,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_name_email_key" ON "User"("name", "email");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userName_userEmail_fkey" FOREIGN KEY ("userName", "userEmail") REFERENCES "User"("name", "email") ON DELETE CASCADE ON UPDATE CASCADE;
