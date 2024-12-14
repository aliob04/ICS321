"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AssignStaffPage() {
  const router = useRouter();
  const [staff, setStaff] = useState([]);
  const [trains, setTrains] = useState([]);
  const [formData, setFormData] = useState({
    staffId: '',
    trainId: '',
    date: ''
  });

  useEffect(() => {
    fetchStaffAndTrains();
  }, []);

  const fetchStaffAndTrains = async () => {
    try {
      const staffResponse = await fetch('/api/staff');
      const trainResponse = await fetch('/api/trains');
      const staffData = await staffResponse.json();
      const trainData = await trainResponse.json();
      setStaff(staffData);
      setTrains(trainData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/staff/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push('/admin/staff');
      }
    } catch (error) {
      console.error('Error assigning staff:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assign Staff to Train</h1>

      <form onSubmit={handleSubmit}>
        <select 
          name="staffId" 
          onChange={handleChange} 
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">Select Staff Member</option>
          {staff.map(member => (
            <option key={member.id} value={member.id}>
              {member.name} - {member.role}
            </option>
          ))}
        </select>

        <select 
          name="trainId" 
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

        <input 
          type="date" 
          name="date" 
          onChange={handleChange} 
          className="border p-2 rounded w-full mb-4"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Assign Staff
        </button>
      </form>
    </div>
  );
}
