"use client";

import { useEffect, useState } from 'react';

export default function DependentsReportPage() {
  const [date, setDate] = useState('');
  const [dependents, setDependents] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/reports/dependents?date=${date}`);
      const data = await response.json();
      setDependents(data);
    } catch (error) {
      console.error('Error fetching dependents report:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dependents Traveling on a Given Date</h1>

      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
        className="border p-2 rounded mb-4"
      />
      <button 
        onClick={fetchData} 
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4">
        Get Report
      </button>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Passenger</th>
            <th className="px-4 py-2">Dependent</th>
          </tr>
        </thead>
        <tbody>
          {dependents.map(item => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{item.passenger.user.name}</td>
              <td className="px-4 py-2">{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
