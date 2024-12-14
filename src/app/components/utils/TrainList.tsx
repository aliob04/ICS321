import prisma from "@/app/utils/db";
import TrainCard from "./TrainCard";

export default async function TrainList() {
  const trains = await prisma.train.findMany({
    select: {
      id: true,
      nameArabic: true,
      nameEnglish: true,
      departureTime: true,
      arrivalTime: true,
      fromStation: {
        select: {
          name: true,
        },
      },
      toStation: {
        select: {
          name: true,
        },
      },
      // Note: We no longer need reservation dates for filtering if we're removing the date criteria
      // reservations: {
      //   select: {
      //     date: true
      //   }
      // }
    },
  });

  // If `reservations` data is needed, fetch and pass it accordingly.
  // For now, we'll pass an empty array or fetch reservations if necessary.

  const reservations = []; // Replace with actual reservation fetching logic if needed.

  return <TrainCard trains={trains} reservations={reservations} />;
}
