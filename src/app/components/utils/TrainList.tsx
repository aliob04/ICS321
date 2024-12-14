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

    },
  });

  const stations = await prisma.station.findMany({
    select: {
      name: true,
    },
  });

  const stationNames = stations.map((station) => station.name);
  
  return <TrainCard trains={trains} stations={stationNames} />;
}
