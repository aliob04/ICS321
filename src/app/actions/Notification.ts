"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/app/utils/db";
import getCurrentUser from "./getCurrentUser";

export async function addToReservationList(formData: FormData) {
  const trainId = formData.get("trainId") as string;
  const pathname = formData.get("pathName") as string;

  if (!trainId || !pathname) {
    throw new Error("Train ID or Pathname is missing.");
  }

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated.");
  }

  // Fetch or create passenger
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

  // Fetch train details
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

  // Create reservation
  const reservation = await prisma.reservation.create({
    data: {
      trainId,
      passengerId: passenger.id,
      fromStationId: train.fromStationId,
      toStationId: train.toStationId,
      departureTime: train.departureTime,
      arrivalTime: train.arrivalTime,
    },
  });

  revalidatePath(pathname);

  return reservation;
}

export async function deleteFromReservationList(formData: FormData) {
  const reservationId = formData.get("reservationId") as string;
  const pathName = formData.get("pathName") as string;

  if (!reservationId) {
    throw new Error("Reservation ID is missing.");
  }

  const deletedReservation = await prisma.reservation.delete({
    where: { id: reservationId },
  });

  revalidatePath(pathName);

  return deletedReservation;
}
