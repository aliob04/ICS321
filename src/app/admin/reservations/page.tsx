"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/reservations');
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const deleteReservation = async (id) => {
    if (!confirm('Are you sure you want to delete this reservation?')) return;

    try {
      await fetch(`/api/reservations/${id}`, { method: 'DELETE' });
      setReservations(reservations.filter(reservation => reservation.id !== id));
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <div className="p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Manage Reservations</h1>
        <Link href="/admin/reservations/add" className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 inline-block">
          + Add New Reservation
        </Link>
      </header>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Passenger</th>
            <th className="px-4 py-2">Train</th>
            <th className="px-4 py-2">From</th>
            <th className="px-4 py-2">To</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.id} className="border-t">
              <td className="px-4 py-2">{reservation.passenger.user.name}</td>
              <td className="px-4 py-2">{reservation.train.nameEnglish}</td>
              <td className="px-4 py-2">{reservation.fromStation.name}</td>
              <td className="px-4 py-2">{reservation.toStation.name}</td>
              <td className="px-4 py-2">{new Date(reservation.date).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <Link href={`/admin/reservations/edit/${reservation.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2">
                  Edit
                </Link>
                <button onClick={() => deleteReservation(reservation.id)} className="bg-red-600 text-white px-2 py-1 rounded-md">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
