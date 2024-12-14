"use client";

import { useEffect, useState } from 'react';

export default function LoadFactorReportPage() {
  const [date, setDate] = useState('');
  const [loadFactors, setLoadFactors] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/reports/loadfactor?date=${date}`);
      const data = await response.json();
      setLoadFactors(data);
    } catch (error) {
      console.error('Error fetching load factor report:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Load Factor Report</h1>

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
            <th className="px-4 py-2">Train</th>
            <th className="px-4 py-2">Load Factor (%)</th>
          </tr>
        </thead>
        <tbody>
          {loadFactors.map(train => (
            <tr key={train.id} className="border-t">
              <td className="px-4 py-2">{train.nameEnglish}</td>
              <td className="px-4 py-2">{train.loadFactor}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
