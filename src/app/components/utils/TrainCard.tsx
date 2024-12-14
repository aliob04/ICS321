'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaCirclePlus } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { Button } from '@/components/ui/button';
import { addToReservationList, deleteFromReservationList } from '@/app/actions/Notification';

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
  reservations?: string[];
  stations: string[]; // IDs of reserved trains (optional)
}

export default function TrainCard({ trains, reservations = [], stations }: TrainCardProps) {
  const pathname = usePathname();
  const [reservedTrains, setReservedTrains] = useState<string[]>(reservations || []);
  const [filteredTrains, setFilteredTrains] = useState(trains || []);

  const [fromStationFilter, setFromStationFilter] = useState("");
  const [toStationFilter, setToStationFilter] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    let newFiltered = [...trains];

    if (fromStationFilter) {
      newFiltered = newFiltered.filter(train =>
        train.fromStation?.name === fromStationFilter
      );
    }

    if (toStationFilter) {
      newFiltered = newFiltered.filter(train =>
        train.toStation?.name === toStationFilter
      );
    }

    setFilteredTrains(newFiltered);
  };

  const handleAddToReservation = async (trainId: string) => {
    try {
      const reservation = await addToReservationList({ trainId, pathName: pathname });
      if (reservation) {
        setReservedTrains((prev) => [...prev, trainId]);
      } else {
        console.error("Failed to add reservation");
      }
    } catch (error) {
      console.error("Error adding reservation:", error);
    }
  };

  const handleDeleteReservation = async (reservationId: string) => {
    try {
      const deletedReservation = await deleteFromReservationList({ reservationId, pathName: pathname });
      if (deletedReservation) {
        setReservedTrains((prev) => prev.filter((id) => id !== reservationId));
      } else {
        console.error("Failed to delete reservation");
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Train Schedules</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8 p-4 bg-white shadow rounded flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium text-gray-700">
            From Station
          </label>
          <select
            value={fromStationFilter}
            onChange={(e) => setFromStationFilter(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            {stations?.map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block mb-1 font-medium text-gray-700">
            To Station
          </label>
          <select
            value={toStationFilter}
            onChange={(e) => setToStationFilter(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            {stations?.map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
      
      {/* Train Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredTrains.map((train) => (
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
                  className={`h-4 w-4 ${reservedTrains.includes(train.id) ? 'text-green-500' : 'text-red-500'}`}
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
    </div>
  );
}
