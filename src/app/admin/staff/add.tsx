"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddStaffPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push('/admin/staff');
      }
    } catch (error) {
      console.error('Error adding staff member:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Staff Member</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Add Staff Member
        </button>
      </form>
    </div>
  );
}
