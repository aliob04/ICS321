"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditStaffPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
  });

  useEffect(() => {
    fetch(`/api/staff/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/staff/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      router.push('/admin/staff');
    } catch (error) {
      console.error('Error updating staff member:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Staff Member</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Update Staff Member
        </button>
      </form>
    </div>
  );
}
