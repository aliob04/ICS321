/*
  Warnings:

  - Added the required column `arrivalTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromStationId` to the `Train` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toStationId` to the `Train` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "arrivalTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "departureTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Train" ADD COLUMN     "fromStationId" TEXT NOT NULL,
ADD COLUMN     "toStationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_fromStationId_fkey" FOREIGN KEY ("fromStationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_toStationId_fkey" FOREIGN KEY ("toStationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
