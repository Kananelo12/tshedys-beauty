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
    { label: 'New Booking', icon: '➕', href: '/admin/bookings', color: 'gold' },
    { label: 'Add Service', icon: '✨', href: '/admin/services', color: 'blue' },
    { label: 'Upload Image', icon: '📸', href: '/admin/gallery', color: 'purple' },
    { label: 'View Reports', icon: '📊', href: '#', color: 'green' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-script font-bold text-gold-500 mb-2">
          Welcome Back, Admin!
        </h2>
        <p className="text-gray-400">Here&apos;s what&apos;s happening with your salon today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} hover className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{stat.icon}</div>
              {stat.trend === 'up' && (
                <span className="text-green-500 text-sm flex items-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-xs text-gray-600 mt-2">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="bg-charcoal-900 rounded-xl p-6 border border-charcoal-800 hover:border-gold-500/50 transition-all duration-300 text-center group card-hover"
            >
              <div className="text-4xl mb-3">{action.icon}</div>
              <p className="text-sm font-medium text-gray-300 group-hover:text-gold-500 transition-colors">
                {action.label}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Recent Bookings</h3>
          <a href="/admin/bookings" className="text-sm text-gold-500 hover:text-gold-400 transition-colors">
            View all →
          </a>
        </div>
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
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-charcoal-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center text-gold-500 font-semibold text-sm mr-3">
                          {booking.name.charAt(0)}
                        </div>
                        <span className="text-sm text-white">{booking.name}</span>
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
                        booking.status === 'confirmed'
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-yellow-900/30 text-yellow-400'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-gold-500 hover:text-gold-400 transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gold-500 mb-4">This Week&apos;s Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">New Bookings</span>
              <span className="text-white font-semibold">23</span>
            </div>
            <div className="w-full bg-charcoal-800 rounded-full h-2">
              <div className="bg-gold-500 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Completed Services</span>
              <span className="text-white font-semibold">18</span>
            </div>
            <div className="w-full bg-charcoal-800 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '55%' }}></div>
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Cancellations</span>
              <span className="text-white font-semibold">2</span>
            </div>
            <div className="w-full bg-charcoal-800 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gold-500 mb-4">Popular Services</h3>
          <div className="space-y-4">
            {[
              { name: 'Hair Coloring', bookings: 15, percentage: 85 },
              { name: 'Braiding', bookings: 12, percentage: 68 },
              { name: 'Keratin Treatment', bookings: 9, percentage: 51 },
              { name: 'Special Occasions', bookings: 6, percentage: 34 },
            ].map((service, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">{service.name}</span>
                  <span className="text-xs text-gray-500">{service.bookings} bookings</span>
                </div>
                <div className="w-full bg-charcoal-800 rounded-full h-2">
                  <div 
                    className="bg-linear-to-r from-gold-500 to-gold-600 h-2 rounded-full" 
                    style={{ width: `${service.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
