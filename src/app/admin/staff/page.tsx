"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StaffPage() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/staff');
      const data = await response.json();
      setStaff(data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const deleteStaff = async (id) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return;

    try {
      await fetch(`/api/staff/${id}`, { method: 'DELETE' });
      setStaff(staff.filter(member => member.id !== id));
    } catch (error) {
      console.error('Error deleting staff member:', error);
    }
  };

  return (
    <div className="p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Manage Staff</h1>
        <Link href="/admin/staff/add" className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 inline-block">
          + Add New Staff Member
        </Link>
      </header>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(member => (
            <tr key={member.id} className="border-t">
              <td className="px-4 py-2">{member.name}</td>
              <td className="px-4 py-2">{member.role}</td>
              <td className="px-4 py-2">
                <Link href={`/admin/staff/edit/${member.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2">
                  Edit
                </Link>
                <button onClick={() => deleteStaff(member.id)} className="bg-red-600 text-white px-2 py-1 rounded-md">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
