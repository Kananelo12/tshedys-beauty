'use client';

import { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';

export default function BookingsManagement() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const bookings = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+27 123 456 789', service: 'Hair Coloring', date: '2026-01-13', time: '10:00 AM', status: 'confirmed', notes: 'Prefers blonde highlights' },
    { id: 2, name: 'Maria Garcia', email: 'maria@email.com', phone: '+27 123 456 790', service: 'Braiding', date: '2026-01-13', time: '2:00 PM', status: 'confirmed', notes: '' },
    { id: 3, name: 'Lisa Chen', email: 'lisa@email.com', phone: '+27 123 456 791', service: 'Keratin Treatment', date: '2026-01-14', time: '11:00 AM', status: 'pending', notes: 'First time treatment' },
    { id: 4, name: 'Emma Wilson', email: 'emma@email.com', phone: '+27 123 456 792', service: 'Haircut & Styling', date: '2026-01-14', time: '3:00 PM', status: 'confirmed', notes: '' },
    { id: 5, name: 'Olivia Brown', email: 'olivia@email.com', phone: '+27 123 456 793', service: 'Special Occasion', date: '2026-01-15', time: '1:00 PM', status: 'pending', notes: 'Wedding guest' },
    { id: 6, name: 'Sophia Davis', email: 'sophia@email.com', phone: '+27 123 456 794', service: 'Deep Conditioning', date: '2026-01-15', time: '4:00 PM', status: 'confirmed', notes: '' },
    { id: 7, name: 'Ava Martinez', email: 'ava@email.com', phone: '+27 123 456 795', service: 'Weaves & Extensions', date: '2026-01-16', time: '10:00 AM', status: 'pending', notes: '' },
    { id: 8, name: 'Mia Anderson', email: 'mia@email.com', phone: '+27 123 456 796', service: 'Natural Hair Care', date: '2026-01-16', time: '2:00 PM', status: 'cancelled', notes: 'Client requested cancellation' },
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusColors = {
    confirmed: 'bg-green-900/30 text-green-400',
    pending: 'bg-yellow-900/30 text-yellow-400',
    cancelled: 'bg-red-900/30 text-red-400',
    completed: 'bg-blue-900/30 text-blue-400',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Bookings Management</h2>
          <p className="text-gray-400 text-sm mt-1">Manage all customer appointments</p>
        </div>
        <Button>
          <span className="mr-2">➕</span> New Booking
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'confirmed', 'pending', 'cancelled', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === status
                    ? 'bg-gold-500 text-charcoal-950'
                    : 'bg-charcoal-800 text-gray-400 hover:text-white'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-400 mb-1">Total Bookings</p>
          <p className="text-2xl font-bold text-white">{bookings.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-400 mb-1">Confirmed</p>
          <p className="text-2xl font-bold text-green-400">
            {bookings.filter(b => b.status === 'confirmed').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-400 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">
            {bookings.filter(b => b.status === 'pending').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-400 mb-1">Cancelled</p>
          <p className="text-2xl font-bold text-red-400">
            {bookings.filter(b => b.status === 'cancelled').length}
          </p>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-charcoal-800 border-b border-charcoal-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-charcoal-800 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gold-500/20 rounded-full flex items-center justify-center text-gold-500 font-semibold mr-3">
                        {booking.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{booking.name}</div>
                        <div className="text-xs text-gray-500">{booking.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {booking.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div>{booking.date}</div>
                    <div className="text-xs text-gray-500">{booking.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusColors[booking.status as keyof typeof statusColors]
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-gold-500 hover:text-gold-400 transition-colors p-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-blue-500 hover:text-blue-400 transition-colors p-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="text-red-500 hover:text-red-400 transition-colors p-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📅</div>
            <p className="text-gray-400">No bookings found matching your filters</p>
          </div>
        )}
      </Card>
    </div>
  );
}
