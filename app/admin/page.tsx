"use client";

import Card from '../components/Card';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [query, setQuery] = useState('');

  const stats = [
    { label: "Today's Bookings", value: '12', icon: '📅', change: '+3' },
    { label: 'Total Services', value: '24', icon: '✨', change: '2 categories' },
    { label: 'Gallery Images', value: '48', icon: '🖼️', change: '8 this week' },
    { label: 'Monthly Revenue', value: 'R18,500', icon: '💰', change: '+12%' },
  ];

  const recent = [
    { id: 1, name: 'Sarah Johnson', service: 'Hair Coloring', date: 'Today 10:00 AM', status: 'confirmed' },
    { id: 2, name: 'Maria Garcia', service: 'Braiding', date: 'Today 2:00 PM', status: 'confirmed' },
    { id: 3, name: 'Lisa Chen', service: 'Keratin Treatment', date: 'Tomorrow 11:00 AM', status: 'pending' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif font-medium text-gray-900 mb-1">Welcome back</h2>
        <p className="text-sm text-gray-600">Overview of your salon&apos;s activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-start justify-between">
              <div className="text-3xl">{s.icon}</div>
              <div className="text-xs text-gray-500">{s.change}</div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif">Recent Bookings</h3>
            <Link href="/admin/bookings" className="text-sm text-sage-600">Manage →</Link>
          </div>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cream-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase">Client</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase">Service</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase">Date</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r) => (
                    <tr key={r.id} className="odd:bg-white even:bg-cream-50">
                      <td className="px-4 py-3 text-sm font-medium">{r.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{r.service}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{r.date}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          r.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif">Quick Actions</h3>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Quick search" className="rounded-full border border-gray-200 px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/bookings" className="bg-white rounded-xl p-3 border border-gray-200 text-center hover:border-sage-500">New Booking</Link>
            <Link href="/admin/services" className="bg-white rounded-xl p-3 border border-gray-200 text-center hover:border-sage-500">Add Service</Link>
            <Link href="/admin/gallery" className="bg-white rounded-xl p-3 border border-gray-200 text-center hover:border-sage-500">Upload Image</Link>
            <a href="#" className="bg-white rounded-xl p-3 border border-gray-200 text-center hover:border-sage-500">Reports</a>
          </div>
        </div>
      </div>
    </div>
  );
}
