// src/app/components/search/SearchForm.tsx

'use client';

import { useState } from 'react';
import Button from '@/app/components/utils/Button';
import { toast } from 'react-hot-toast';

interface SearchFormData {
  departure: string;
  arrival: string;
  date: string;
}

export default function SearchForm() {
  const [formData, setFormData] = useState<SearchFormData>({
    departure: '',
    arrival: '',
    date: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Show toast with search details
    toast.success(
      `Search button is clicked!\nFrom: ${formData.departure}\nTo: ${formData.arrival}\nDate: ${formData.date}`,
      {
        duration: 4000,
        style: {
          whiteSpace: 'pre-line'  // This allows \n to create new lines
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="From"
          value={formData.departure}
          onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
          className="border rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="To"
          value={formData.arrival}
          onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
          className="border rounded-lg p-2"
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="border rounded-lg p-2"
        />
      </div>
      <Button label="Search" onClick={handleSubmit} />
    </form>
  );
}
