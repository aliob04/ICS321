"use client";

import Link from 'next/link';

export default function ReportsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      <div className="grid grid-cols-2 gap-6">
        
        {/* Link to Stations Report */}
        <Link 
          href="/admin/reports/stations" 
          className="bg-white p-4 shadow-md rounded-md hover:bg-blue-100"
        >
          <h2 className="text-xl font-bold">List of Stations for Each Train</h2>
          <p>View the list of all stations associated with each train.</p>
        </Link>

        {/* Link to Waitlist Report */}
        <Link 
          href="/admin/reports/waitlist" 
          className="bg-white p-4 shadow-md rounded-md hover:bg-blue-100"
        >
          <h2 className="text-xl font-bold">Waitlisted Loyalty Passengers</h2>
          <p>View passengers who are currently on the waitlist for trains.</p>
        </Link>

        {/* Link to Dependents Report */}
        <Link 
          href="/admin/reports/dependents" 
          className="bg-white p-4 shadow-md rounded-md hover:bg-blue-100"
        >
          <h2 className="text-xl font-bold">Dependents Traveling on a Given Date</h2>
          <p>View dependents traveling on a specific date.</p>
        </Link>

        {/* Link to Load Factor Report */}
        <Link 
          href="/admin/reports/loadfactor" 
          className="bg-white p-4 shadow-md rounded-md hover:bg-blue-100"
        >
          <h2 className="text-xl font-bold">Load Factor Report</h2>
          <p>View the percentage of seats occupied for each train.</p>
        </Link>

      </div>
    </div>
  );
}
