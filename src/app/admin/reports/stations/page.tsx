"use client";

import { useState, useEffect } from 'react';

interface Train {
  id: string;
  nameEnglish: string;
  nameArabic: string;
  departureTime: string;
  arrivalTime: string;
}

interface Station {
  id: string;
  name: string;
  fromStation: Train[];
  toStation: Train[];
}

export default function StationsReportPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stations/report');
      
      if (!response.ok) {
        throw new Error('Failed to fetch stations report');
      }
      
      const data = await response.json();
      setStations(data);
    } catch (error) {
      console.error('Error fetching stations:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch stations');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Stations Report</h1>
      <div className="grid gap-6">
        {stations.map((station) => (
          <div key={station.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{station.name}</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Departing Trains */}
              <div>
                <h3 className="text-lg font-medium mb-3 text-blue-600">Departing Trains</h3>
                {station.fromStation.length > 0 ? (
                  <div className="space-y-2">
                    {station.fromStation.map((train) => (
                      <div key={train.id} className="p-3 bg-gray-50 rounded">
                        <p className="font-medium">{train.nameEnglish} - {train.nameArabic}</p>
                        <p className="text-sm text-gray-600">
                          Departure: {new Date(train.departureTime).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No departing trains</p>
                )}
              </div>

              {/* Arriving Trains */}
              <div>
                <h3 className="text-lg font-medium mb-3 text-green-600">Arriving Trains</h3>
                {station.toStation.length > 0 ? (
                  <div className="space-y-2">
                    {station.toStation.map((train) => (
                      <div key={train.id} className="p-3 bg-gray-50 rounded">
                        <p className="font-medium">{train.nameEnglish} - {train.nameArabic}</p>
                        <p className="text-sm text-gray-600">
                          Arrival: {new Date(train.arrivalTime).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No arriving trains</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 