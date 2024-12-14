"use client";

import { useEffect, useState } from 'react';

export default function WaitlistPage() {
  const [waitlist, setWaitlist] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/waitlist');
      const data = await response.json();
      setWaitlist(data);
    } catch (error) {
      console.error('Error fetching waitlist:', error);
    }
  };

  const promotePassenger = async (id) => {
    try {
      await fetch(`/api/waitlist/promote/${id}`, { method: 'POST' });
      setWaitlist(waitlist.filter(passenger => passenger.id !== id));
    } catch (error) {
      console.error('Error promoting passenger:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Waitlisted Passengers</h1>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Passenger Name</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {waitlist.map(passenger => (
            <tr key={passenger.id} className="border-t">
              <td className="px-4 py-2">{passenger.name}</td>
              <td className="px-4 py-2">
                <button 
                  onClick={() => promotePassenger(passenger.id)} 
                  className="bg-green-600 text-white px-2 py-1 rounded-md"
                >
                  Promote
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
