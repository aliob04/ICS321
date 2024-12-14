"use client";

import { useEffect, useState } from 'react';

export default function StationsReportPage() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/reports/stations');
      const data = await response.json();
      setTrains(data);
    } catch (error) {
      console.error('Error fetching stations report:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">List of Stations for Each Train</h1>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Train</th>
            <th className="px-4 py-2">Stations</th>
          </tr>
        </thead>
        <tbody>
          {trains.map(train => (
            <tr key={train.id} className="border-t">
              <td className="px-4 py-2">{train.nameEnglish}</td>
              <td className="px-4 py-2">
                {train.stations.map(station => (
                  <span key={station.id} className="block">
                    {station.name}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
