"use client";

import { useState } from 'react';

export default function AdminBookingsPage() {
  const [filter, setFilter] = useState('all');
  const sample = [
    { id: 1, client: 'Sarah Johnson', service: 'Hair Coloring', date: 'Today 10:00', status: 'confirmed' },
    { id: 2, client: 'Maria Garcia', service: 'Braiding', date: 'Today 14:00', status: 'confirmed' },
    { id: 3, client: 'Lisa Chen', service: 'Keratin', date: 'Tomorrow 11:00', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-medium text-gray-900">Bookings</h2>
        <div className="flex items-center gap-2">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-full border border-gray-200 px-3 py-2 text-sm">
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="pending">Pending</option>
          </select>
          <a href="#" className="px-4 py-2 rounded-full bg-sage-600 text-white">New Booking</a>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs text-gray-500">Client</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500">Service</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500">Date</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500">Status</th>
                <th className="text-right px-4 py-3 text-xs text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sample.map((s) => (
                <tr key={s.id} className="odd:bg-white even:bg-cream-50">
                  <td className="px-4 py-3 font-medium">{s.client}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{s.service}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{s.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      s.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>{s.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a href="#" className="text-sm text-sage-600 mr-3">Edit</a>
                    <a href="#" className="text-sm text-red-500">Cancel</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
