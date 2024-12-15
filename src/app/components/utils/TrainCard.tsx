'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaCirclePlus } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";

import { addToReservationList, deleteFromReservationList } from '@/app/actions/Notification';
import { BiSearch } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import CardModal from '../modals/CardModal';

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

  const [open, setOpen] = useState<string | null>(null); // Track the open modal for each train
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
      {pathname !== '/reservation' ? (
        <form
          onSubmit={handleSearch}
          className="z-50 max-w-3xl mx-auto mb-8 p-4 bg-slate-100 shadow-xl transition ease-out delay-150 hover:scale-105 rounded-3xl flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="flex-1 rounded-2xl">
            <select
              value={fromStationFilter}
              onChange={(e) => setFromStationFilter(e.target.value)}
              className="w-full p-2 border rounded-2xl transition ease-out delay-150 hover:scale-105 font-semibold"
            >
              <option value="">From Station</option>
              {stations?.map((station) => (
                <option key={station} value={station}>
                  {station}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <select
              value={toStationFilter}
              onChange={(e) => setToStationFilter(e.target.value)}
              className="w-full p-2 border rounded-2xl transition ease-out delay-150 hover:scale-105 font-semibold"
            >
              <option value="">To Station</option>
              {stations?.map((station) => (
                <option key={station} value={station}>
                  {station}
                </option>
              ))}
            </select>
          </div>
          <Button
          variant='secondary'
            type="submit"
            className="transition ease-in-out delay-75 bg-green-400 hover:bg-slate-500 hover:scale-105 text-white rounded-full px-4 py-2 font-semibold flex justify-center items-center"
          >
            <BiSearch />
          </Button>
        </form>
      ) : null}

      {/* Train Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredTrains.map((train) => (
          <div
            key={train.id}
            className="relative h-60 p-4 rounded-xl shadow-md bg-gradient-to-br from-white to-slate-300 hover:shadow-lg hover:scale-105 transform transition duration-200 ease-in-out flex flex-col justify-center"
          >
            {pathname === '/reservation' ? (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-3xl absolute right-5 top-5 z-10"
                onClick={() => handleDeleteReservation(train.id)}
              >
                <FaCirclePlus
                  className={`h-12 w-12 transition ${
                    reservedTrains.includes(train.id) ? 'text-green-500' : 'text-rose-500'
                  }`}
                />
              </Button>
            ) : pathname !== '/dashboard' ? (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-3xl absolute right-5 top-5 z-10"
                onClick={() => handleAddToReservation(train.id)}
              >
                <CiCirclePlus
                  width={12}
                  className={`h-12 w-12 ${
                    reservedTrains.includes(train.id) ? 'text-rose-500' : 'text-green-500'
                  }`}
                />
              </Button>
            ) : null}

            <h2 className="font-semibold text-xl mb-5 text-gray-900 text-center">
              {train.nameEnglish} - {train.nameArabic}
            </h2>
            <p className="text-base text-gray-700 mb-2 flex items-center">
              <span className="font-medium text-black rounded px-2 py-0.5 inline-block mr-2">
                From
              </span>
              <span>{train.fromStation?.name}</span>
            </p>
            <p className="text-base text-gray-700 mb-2 flex items-center">
              <span className="font-medium text-black rounded px-2 py-0.5 inline-block mr-2">
                To
              </span>
              <span>{train.toStation?.name}</span>
            </p>
            <p className="text-base text-gray-700 mb-2 flex items-center">
              <span className="font-medium text-black rounded px-2 py-0.5 inline-block mr-2">
                Departs
              </span>
              <span>{train.departureTime}</span>
            </p>
            <p className="text-base text-gray-700 flex items-center">
              <span className="font-medium text-black rounded px-2 py-0.5 inline-block mr-2">
                Arrives
              </span>
              <span>{train.arrivalTime}</span>
            </p>
            { pathname==='/reservation' || pathname==='/dashboard' ? (
            <div className="flex gap-3 w-full flex-row items-end justify-end">
              <Button onClick={() => setOpen(train.id)} className="bg-green-500 font-semibold">
                Info
              </Button>

              <CardModal
                nameArabic={train.nameArabic}
                nameEnglish={train.nameEnglish}
                toStation={train.toStation.name}
                fromStation={train.fromStation.name}
                id={train.id}
                arrivalTime={train.arrivalTime}
                departureTime={train.departureTime}
                open={open === train.id}
                onClose={() => setOpen(null)}
              />
            </div>): null}
          </div>
        ))}
      </div>
    </div>
  );
}
