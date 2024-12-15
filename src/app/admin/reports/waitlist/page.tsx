"use client";

import { useState, useEffect } from 'react';

interface WaitlistedPassenger {
  id: string;
  expirationDate: string;
  paymentStatus: string;
  reservation: {
    user: {
      name: string | null;
      email: string | null;
    };
    train: {
      nameEnglish: string;
      nameArabic: string;
      departureTime: string;
      fromStation: {
        name: string;
      };
      toStation: {
        name: string;
      };
    };
  };
}

export default function WaitlistReportPage() {
  const [waitlist, setWaitlist] = useState<WaitlistedPassenger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const fetchWaitlist = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/waitlist/report');
      
      if (!response.ok) {
        throw new Error('Failed to fetch waitlist');
      }
      
      const data = await response.json();
      setWaitlist(data);
    } catch (error) {
      console.error('Error fetching waitlist:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch waitlist');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Waitlisted Passengers</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600">Passenger</th>
              <th className="px-6 py-3 text-left text-gray-600">Train</th>
              <th className="px-6 py-3 text-left text-gray-600">Route</th>
              <th className="px-6 py-3 text-left text-gray-600">Departure</th>
              <th className="px-6 py-3 text-left text-gray-600">Payment Status</th>
              <th className="px-6 py-3 text-left text-gray-600">Expires</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {waitlist.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  {entry.reservation.user.name || entry.reservation.user.email}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p>{entry.reservation.train.nameEnglish}</p>
                    <p className="text-sm text-gray-500">{entry.reservation.train.nameArabic}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm">From: {entry.reservation.train.fromStation.name}</p>
                    <p className="text-sm">To: {entry.reservation.train.toStation.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {new Date(entry.reservation.train.departureTime).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    entry.paymentStatus === 'Paid' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {entry.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(entry.expirationDate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {waitlist.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No passengers currently on waitlist
          </div>
        )}
      </div>
    </div>
  );
} 