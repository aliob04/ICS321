"use server";
import prisma from "@/app/utils/db";
import getCurrentUser from "./getCurrentUser";

export async function addToReservationList({ trainId, pathName }: { trainId: string; pathName: string }) {
  if (!trainId || !pathName) {
    throw new Error("Train ID or Pathname is missing.");
  }

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated.");
  }

  let passenger = await prisma.passenger.findUnique({
    where: { userId: user.id },
  });

  if (!passenger) {
    passenger = await prisma.passenger.create({
      data: {
        userId: user.id,
      },
    });
  }

  const train = await prisma.train.findUnique({
    where: { id: trainId },
    select: {
      fromStationId: true,
      toStationId: true,
      departureTime: true,
      arrivalTime: true,
    },
  });

  if (!train) {
    throw new Error("Train not found.");
  }

  const reservation = await prisma.reservation.create({
    data: {
      trainId,
      userName: user.name, // Ensure `user.name` exists
      userEmail: user.email, // Ensure `user.email` exists
      passengerId: passenger.id,
      fromStationId: train.fromStationId,
      toStationId: train.toStationId,
      departureTime: train.departureTime,
      arrivalTime: train.arrivalTime,
    },
  });
  

  return reservation;
}

export async function deleteFromReservationList({ reservationId, pathName }: { reservationId: string; pathName: string }) {
  if (!reservationId) {
    throw new Error("Reservation ID is missing.");
  }

  const deletedReservation = await prisma.reservation.delete({
    where: { id: reservationId },
  });

  return deletedReservation;
}
