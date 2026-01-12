'use client';

import Card from '../components/Card';

export default function AdminDashboard() {
  const stats = [
    { label: 'Today\'s Bookings', value: '12', icon: '📅', change: '+3 from yesterday', trend: 'up' },
    { label: 'Total Services', value: '24', icon: '✨', change: '2 active categories', trend: 'neutral' },
    { label: 'Gallery Images', value: '48', icon: '🖼️', change: '8 added this week', trend: 'up' },
    { label: 'Monthly Revenue', value: 'R18,500', icon: '💰', change: '+12% from last month', trend: 'up' },
  ];

  const recentBookings = [
    { id: 1, name: 'Sarah Johnson', service: 'Hair Coloring', date: 'Today', time: '10:00 AM', status: 'confirmed' },
    { id: 2, name: 'Maria Garcia', service: 'Braiding', date: 'Today', time: '2:00 PM', status: 'confirmed' },
    { id: 3, name: 'Lisa Chen', service: 'Keratin Treatment', date: 'Tomorrow', time: '11:00 AM', status: 'pending' },
    { id: 4, name: 'Emma Wilson', service: 'Haircut & Styling', date: 'Tomorrow', time: '3:00 PM', status: 'confirmed' },
    { id: 5, name: 'Olivia Brown', service: 'Special Occasion', date: 'Jan 15', time: '1:00 PM', status: 'pending' },
  ];

  const quickActions = [
    { label: 'New Booking', icon: '➕', href: '/admin/bookings', color: 'sage' },
    { label: 'Add Service', icon: '✨', href: '/admin/services', color: 'blue' },
    { label: 'Upload Image', icon: '📸', href: '/admin/gallery', color: 'purple' },
    { label: 'View Reports', icon: '📊', href: '#', color: 'green' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-serif font-medium text-gray-900 mb-2">
          Welcome Back, Admin!
        </h2>
        <p className="text-gray-600">Here&apos;s what&apos;s happening with your salon today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} hover className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{stat.icon}</div>
              {stat.trend === 'up' && (
                <span className="text-green-600 text-sm flex items-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-xs text-gray-600 mt-2">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-serif font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-sage-500 transition-all duration-300 text-center group card-hover card-elevated"
            >
              <div className="text-4xl mb-3">{action.icon}</div>
              <p className="text-sm font-medium text-gray-700 group-hover:text-sage-600 transition-colors">
                {action.label}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-serif font-medium text-gray-900">Recent Bookings</h3>
          <a href="/admin/bookings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
            View All →
          </a>
        </div>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-cream-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
