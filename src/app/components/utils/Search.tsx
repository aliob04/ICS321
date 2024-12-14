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


export default function Search({ trains, reservations = [], stations }: TrainCardProps) {
    const pathname = usePathname();
    const [reservedTrains, setReservedTrains] = useState<string[]>(reservations || []);
    const [filteredTrains, setFilteredTrains] = useState(trains || []);
  
    const [fromStationFilter, setFromStationFilter] = useState("");
    const [toStationFilter, setToStationFilter] = useState("");

}