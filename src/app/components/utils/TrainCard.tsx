'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaCirclePlus } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { Button } from '@/components/ui/button';

interface TrainWithStations {
  id: string;
  nameArabic: string;
  nameEnglish: string;
  departureTime: string;
  arrivalTime: string;
  fromStation: {
    name: string;
  };
  toStation: {
    name: string;
  };
}

interface TrainCardProps {
  trains: TrainWithStations[];
  reservations?: string[]; // IDs of reserved trains (optional)
}

export default function TrainCard({ trains, reservations = [] }: TrainCardProps) {
  const pathname = usePathname();
  const [reservedTrains, setReservedTrains] = useState<string[]>(reservations);

  const handleAddToReservation = async (trainId: string) => {
    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trainId, pathName: pathname }),
      });

      if (response.ok) {
        const newReservation = await response.json();
        setReservedTrains((prev) => [...prev, trainId]);
      } else {
        console.error('Failed to add reservation');
      }
    } catch (error) {
      console.error('Error adding reservation:', error);
    }
  };

  const handleDeleteReservation = async (reservationId: string) => {
    try {
      const response = await fetch('/api/reservation', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reservationId, pathName: pathname }),
      });

      if (response.ok) {
        setReservedTrains((prev) => prev.filter((id) => id !== reservationId));
      } else {
        console.error('Failed to delete reservation');
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pt-36">
      {trains.map((train) => (
        <div
          key={train.id}
          className="relative h-60 p-4 rounded-xl shadow-md bg-gradient-to-br from-white to-gray-100 hover:shadow-lg hover:scale-105 transform transition duration-200 ease-in-out flex flex-col justify-center"
        >
          {pathname === '/reservation' ? (
            <Button
              variant="outline"
              size="icon"
              className="rounded-3xl absolute right-5 top-5 z-10"
              onClick={() => handleDeleteReservation(train.id)}
            >
              <CiCirclePlus className="h-4 w-4 text-red-500" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              className="rounded-3xl absolute right-5 top-5 z-10"
              onClick={() => handleAddToReservation(train.id)}
            >
              <FaCirclePlus
                className={`h-4 w-4 ${
                  reservedTrains.includes(train.id) ? 'text-green-500' : 'text-red-500'
                }`}
              />
            </Button>
          )}

          <h2 className="font-semibold text-xl mb-5 text-gray-900 text-center">
            {train.nameEnglish} - {train.nameArabic}
          </h2>
          <p className="text-base text-gray-700 mb-2 flex items-center">
            <span className="font-medium bg-gray-800 text-white rounded px-2 py-0.5 inline-block mr-2">
              From
            </span>
            <span>{train.fromStation?.name}</span>
          </p>
          <p className="text-base text-gray-700 mb-2 flex items-center">
            <span className="font-medium bg-gray-800 text-white rounded px-2 py-0.5 inline-block mr-2">
              To
            </span>
            <span>{train.toStation?.name}</span>
          </p>
          <p className="text-base text-gray-700 mb-2 flex items-center">
            <span className="font-medium bg-gray-800 text-white rounded px-2 py-0.5 inline-block mr-2">
              Departs
            </span>
            <span>{train.departureTime}</span>
          </p>
          <p className="text-base text-gray-700 flex items-center">
            <span className="font-medium bg-gray-800 text-white rounded px-2 py-0.5 inline-block mr-2">
              Arrives
            </span>
            <span>{train.arrivalTime}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
