"use client";

import { useEffect, useState } from 'react';

export default function WaitlistReportPage() {
  const [waitlist, setWaitlist] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/reports/waitlist');
      const data = await response.json();
      setWaitlist(data);
    } catch (error) {
      console.error('Error fetching waitlist report:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Waitlisted Loyalty Passengers</h1>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Train</th>
            <th className="px-4 py-2">Passenger</th>
          </tr>
        </thead>
        <tbody>
          {waitlist.map(item => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{item.train.nameEnglish}</td>
              <td className="px-4 py-2">{item.passenger.user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
