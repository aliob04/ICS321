"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditReservationPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    passengerId: '',
    trainId: '',
    fromStationId: '',
    toStationId: '',
    departureTime: '',
    arrivalTime: '',
    date: ''
  });
  const [passengers, setPassengers] = useState([]);
  const [trains, setTrains] = useState([]);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchReservationData();
    fetchDropdownData();
  }, [id]);

  const fetchReservationData = async () => {
    try {
      const response = await fetch(`/api/reservations/${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching reservation:', error);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const passengerResponse = await fetch('/api/passengers');
      const trainResponse = await fetch('/api/trains');
      const stationResponse = await fetch('/api/stations');
      
      const passengerData = await passengerResponse.json();
      const trainData = await trainResponse.json();
      const stationData = await stationResponse.json();

      setPassengers(passengerData);
      setTrains(trainData);
      setStations(stationData);
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push('/admin/reservations');
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Reservation</h1>

      <form onSubmit={handleSubmit}>
        
        {/* Select Passenger */}
        <select 
          name="passengerId" 
          value={formData.passengerId} 
          onChange={handleChange} 
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">Select Passenger</option>
          {passengers.map(passenger => (
            <option key={passenger.id} value={passenger.id}>
              {passenger.user.name}
            </option>
          ))}
        </select>

        {/* Select Train */}
        <select 
          name="trainId" 
          value={formData.trainId} 
          onChange={handleChange} 
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">Select Train</option>
          {trains.map(train => (
            <option key={train.id} value={train.id}>
              {train.nameEnglish}
            </option>
          ))}
        </select>

        {/* Select From Station */}
        <select 
          name="fromStationId" 
          value={formData.fromStationId} 
          onChange={handleChange} 
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">Select From Station</option>
          {stations.map(station => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>

        {/* Select To Station */}
        <select 
          name="toStationId" 
          value={formData.toStationId} 
          onChange={handleChange} 
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">Select To Station</option>
          {stations.map(station => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>

        <input 
          type="time" 
          name="departureTime" 
          value={formData.departureTime} 
          onChange={handleChange} 
          className="border p-2 rounded w-full mb-4"
        />

        <input 
          type="time" 
          name="arrivalTime" 
          value={formData.arrivalTime} 
          onChange={handleChange} 
          className="border p-2 rounded w-full mb-4"
        />

        <input 
          type="date" 
          name="date" 
          value={formData.date.split('T')[0]} 
          onChange={handleChange} 
          className="border p-2 rounded w-full mb-4"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Update Reservation
        </button>
      </form>
    </div>
  );
}
