import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/utils/db';
import TrainCard from '@/app/components/utils/TrainCard';
export default async function ReservationPage() {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }
  
    // Fetch reservations for the current user
    const reservations = await prisma.reservation.findMany({
      where: { passenger: { userId: user.id } },
      include: {
        train: {
          include: {
            fromStation: true,
            toStation: true,
          },
        },
      },
    });
  
    // Transform reservations into the required format for TrainCard
    const trains = reservations.map((reservation) => ({
      id: reservation.id,
      nameArabic: reservation.train.nameArabic,
      nameEnglish: reservation.train.nameEnglish,
      departureTime: reservation.departureTime,
      arrivalTime: reservation.arrivalTime,
      fromStation: { name: reservation.train.fromStation.name },
      toStation: { name: reservation.train.toStation.name },
    }));
  
    return <TrainCard trains={trains} reservations={reservations.map((r) => r.id)} />;
  }