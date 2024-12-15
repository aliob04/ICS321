"use client";

import { useState, useEffect } from 'react';

interface Reservation {
  id: string;
  train: {
    nameEnglish: string;
    nameArabic: string;
    departureTime: string;
    arrivalTime: string;
    fromStation: {
      name: string;
    };
    toStation: {
      name: string;
    };
  };
  user: {
    name: string | null;
    email: string | null;
  };
  createdAt: string;
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reservations');
      
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch reservations');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reservations</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">Passenger</th>
              <th className="px-6 py-3 text-left">Train</th>
              <th className="px-6 py-3 text-left">From</th>
              <th className="px-6 py-3 text-left">To</th>
              <th className="px-6 py-3 text-left">Departure</th>
              <th className="px-6 py-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="border-t">
                <td className="px-6 py-4">{reservation.user.name || reservation.user.email}</td>
                <td className="px-6 py-4">{reservation.train.nameEnglish}</td>
                <td className="px-6 py-4">{reservation.train.fromStation.name}</td>
                <td className="px-6 py-4">{reservation.train.toStation.name}</td>
                <td className="px-6 py-4">{reservation.train.departureTime}</td>
                <td className="px-6 py-4">{new Date(reservation.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
