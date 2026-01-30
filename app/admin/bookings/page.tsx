"use client";

import { useState, useEffect } from 'react';
import { fromUTC } from '@/lib/availability';

interface Booking {
  _id: string;
  clientName: string;
  service: { name: string };
  startDateTime: Date;
  status: string;
}

export default function AdminBookingsPage() {
  const [filter, setFilter] = useState('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'pending') return booking.status === 'PENDING';
    if (filter === 'today') {
      const today = new Date().toDateString();
      return new Date(booking.startDateTime).toDateString() === today;
    }
    return true;
  });

  if (loading) return <div>Loading...</div>;

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
              {filteredBookings.map((booking) => {
                const { date, time } = fromUTC(new Date(booking.startDateTime));
                return (
                  <tr key={booking._id} className="odd:bg-white even:bg-cream-50">
                    <td className="px-4 py-3 font-medium">{booking.clientName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{booking.service?.name || 'Unknown'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{date} {time}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        booking.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>{booking.status.toLowerCase()}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <a href={`/admin/bookings/${booking._id}`} className="text-sm text-sage-600 mr-3">View</a>
                      <a href="#" className="text-sm text-red-500">Cancel</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
