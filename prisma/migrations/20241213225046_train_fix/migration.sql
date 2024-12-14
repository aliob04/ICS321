/*
  Warnings:

  - Added the required column `arrivalTime` to the `Train` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureTime` to the `Train` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Train" ADD COLUMN     "arrivalTime" TEXT NOT NULL,
ADD COLUMN     "departureTime" TEXT NOT NULL;
