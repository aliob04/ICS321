/*
  Warnings:

  - You are about to drop the column `coachType` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "coachType",
DROP COLUMN "status";
