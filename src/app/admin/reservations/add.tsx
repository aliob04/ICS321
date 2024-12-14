"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddReservationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    passengerId: '',
    trainId: '',
    fromStationId: '',
    toStationId: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push('/admin/reservations');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Reservation</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="passengerId"
          placeholder="Passenger ID"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="text"
          name="trainId"
          placeholder="Train ID"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="text"
          name="fromStationId"
          placeholder="From Station ID"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="text"
          name="toStationId"
          placeholder="To Station ID"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Create Reservation
        </button>
      </form>
    </div>
  );
}
