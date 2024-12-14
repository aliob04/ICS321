import prisma from "@/app/utils/db";
import TrainCard from "./TrainCard"; // This will be the client component

export default async function TrainList() {
  const trains = await prisma.train.findMany({
    select: {
      id: true,
      nameArabic: true,
      nameEnglish: true,
      // Remove non-existing fields like fromStationId, etc. if they aren't in your schema
    }
  });

  return <TrainCard trains={trains} />;
}
