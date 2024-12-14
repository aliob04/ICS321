"use server"
import { revalidatePath } from "next/cache"
import prisma from "../utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth"
import getCurrentUser from "./getCurrentUser";



export async function addToReservationList(formData: FormData) {
    "use server"
  const pathname = formData.get("pathName") as string;
  const trainId = formData.get("trainId") as string;

  // Get the current user
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated.");
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

  // Check if passenger exists
  const passenger = await prisma.passenger.findUnique({
    where: { userId: user.id },
  });

  if (!passenger) {
    throw new Error("Passenger not found.");
  }

  // Create reservation
  const reservation = await prisma.reservation.create({
    data: {
      trainId:trainId,
      passengerId: passenger.id,
      fromStationId: train.fromStationId,
      toStationId: train.toStationId,
      departureTime: train.departureTime,
      arrivalTime: train.arrivalTime,
    },
  });

  // Revalidate cache
  revalidatePath(pathname);

  return reservation;
}


export async function deleteFromReservationList(FormData:FormData){
    "use server"


    const watchListId = FormData.get("watchListId") as string
    const pathName =  FormData.get("pathName") as string

    const data = await prisma.reservation.delete({
        where:{
            id:watchListId,
        }
    })
    revalidatePath(pathName)
}
export async function sessions(){
    "use server"
    const session = await getServerSession(authOptions)
}