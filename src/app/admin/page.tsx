"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [trains, setTrains] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const trainResponse = await fetch('/api/trains');
      const reservationResponse = await fetch('/api/reservations');
      const staffResponse = await fetch('/api/staff');
      
      const trainsData = await trainResponse.json();
      const reservationsData = await reservationResponse.json();
      const staffData = await staffResponse.json();
      
      setTrains(trainsData);
      setReservations(reservationsData);
      setStaff(staffData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 text-white text-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>
      
      <main className="p-6">
        <section className="grid grid-cols-3 gap-6 mb-8">
          <Link href="/admin/reservations" className="bg-white p-4 shadow-md rounded-md hover:bg-blue-100">
            <h2 className="text-xl font-bold">Manage Reservations</h2>
            <p>{reservations.length} Total Reservations</p>
          </Link>

          <Link href="/admin/staff" className="bg-white p-4 shadow-md rounded-md hover:bg-blue-100">
            <h2 className="text-xl font-bold">Manage Staff</h2>
            <p>{staff.length} Total Staff Members</p>
          </Link>

          <Link href="/admin/reports" className="bg-white p-4 shadow-md rounded-md hover:bg-blue-100">
            <h2 className="text-xl font-bold">Reports</h2>
            <p>View Key Reports</p>
          </Link>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Active Trains</h2>
          <div className="overflow-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">Train Name</th>
                  <th className="px-4 py-2">From</th>
                  <th className="px-4 py-2">To</th>
                  <th className="px-4 py-2">Departure</th>
                  <th className="px-4 py-2">Arrival</th>
                </tr>
              </thead>
              <tbody>
                {trains.map((train) => (
                  <tr key={train.id} className="border-t">
                    <td className="px-4 py-2">{train.nameEnglish}</td>
                    <td className="px-4 py-2">{train.fromStation.name}</td>
                    <td className="px-4 py-2">{train.toStation.name}</td>
                    <td className="px-4 py-2">{train.departureTime}</td>
                    <td className="px-4 py-2">{train.arrivalTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
