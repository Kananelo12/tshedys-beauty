"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Sparkles,
  Image as ImageIcon,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bookings from API
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBookings(data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      });
  }, []);

  // Calculate stats (convert UTC to Lesotho timezone UTC+2)
  const todayBookings = bookings.filter(b => {
    const utcDate = new Date(b.startDateTime);
    const localDate = new Date(utcDate.getTime() + (2 * 60 * 60 * 1000));
    const today = new Date();
    return localDate.toDateString() === today.toDateString();
  }).length;

  const yesterdayBookings = bookings.filter(b => {
    const utcDate = new Date(b.startDateTime);
    const localDate = new Date(utcDate.getTime() + (2 * 60 * 60 * 1000));
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return localDate.toDateString() === yesterday.toDateString();
  }).length;

  const pendingBookings = bookings.filter(b => b.status === 'PENDING').length;
  const acceptedBookings = bookings.filter(b => b.status === 'ACCEPTED').length;
  
  // Calculate week's and last week's bookings
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfWeek.getDate() - 7);
  
  const thisWeekBookings = bookings.filter(b => {
    const utcDate = new Date(b.startDateTime);
    const localDate = new Date(utcDate.getTime() + (2 * 60 * 60 * 1000));
    return localDate >= startOfWeek && b.status === 'ACCEPTED';
  }).length;
  
  const lastWeekBookings = bookings.filter(b => {
    const utcDate = new Date(b.startDateTime);
    const localDate = new Date(utcDate.getTime() + (2 * 60 * 60 * 1000));
    return localDate >= startOfLastWeek && localDate < startOfWeek && b.status === 'ACCEPTED';
  }).length;
  
  const weeklyChange = lastWeekBookings > 0 
    ? (((thisWeekBookings - lastWeekBookings) / lastWeekBookings) * 100).toFixed(1)
    : '0';
  
  // Calculate monthly revenue
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  
  const thisMonthRevenue = bookings
    .filter(b => {
      const utcDate = new Date(b.startDateTime);
      const localDate = new Date(utcDate.getTime() + (2 * 60 * 60 * 1000));
      return localDate >= startOfMonth && b.status === 'ACCEPTED';
    })
    .reduce((sum, b) => {
      const servicePrice = b.service?.price || 0;
      const houseCallFee = b.houseCallFee || 0;
      const transportCost = b.transportCost || 0;
      return sum + servicePrice + houseCallFee + transportCost;
    }, 0);
  
  const lastMonthRevenue = bookings
    .filter(b => {
      const utcDate = new Date(b.startDateTime);
      const localDate = new Date(utcDate.getTime() + (2 * 60 * 60 * 1000));
      return localDate >= startOfLastMonth && localDate <= endOfLastMonth && b.status === 'ACCEPTED';
    })
    .reduce((sum, b) => {
      const servicePrice = b.service?.price || 0;
      const houseCallFee = b.houseCallFee || 0;
      const transportCost = b.transportCost || 0;
      return sum + servicePrice + houseCallFee + transportCost;
    }, 0);
  
  const monthlyChange = lastMonthRevenue > 0
    ? (((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(1)
    : '0';
  
  const totalRevenue = bookings
    .filter(b => b.status === 'ACCEPTED')
    .reduce((sum, b) => {
      const servicePrice = b.service?.price || 0;
      const houseCallFee = b.houseCallFee || 0;
      const transportCost = b.transportCost || 0;
      return sum + servicePrice + houseCallFee + transportCost;
    }, 0);

  const stats = [
    {
      label: "Today's Bookings",
      value: todayBookings.toString(),
      icon: Calendar,
      change: todayBookings > yesterdayBookings 
        ? `+${todayBookings - yesterdayBookings} from yesterday` 
        : yesterdayBookings > todayBookings
        ? `-${yesterdayBookings - todayBookings} from yesterday`
        : 'Same as yesterday',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      label: "Pending Requests",
      value: pendingBookings.toString(),
      icon: Clock,
      change: pendingBookings > 0 ? 'Awaiting response' : 'All clear',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      label: "Confirmed Bookings",
      value: acceptedBookings.toString(),
      icon: CheckCircle,
      change: weeklyChange !== '0' 
        ? `${Number(weeklyChange) > 0 ? '+' : ''}${weeklyChange}% this week`
        : 'No change this week',
      gradient: 'from-rose-500 to-orange-500',
    },
    {
      label: "Total Revenue",
      value: `M${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: monthlyChange !== '0'
        ? `${Number(monthlyChange) > 0 ? '+' : ''}${monthlyChange}% this month`
        : 'No change this month',
      gradient: 'from-pink-600 to-purple-600',
    },
  ];

  // Calculate weekly data from real bookings
  const weeklyData = (() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const data = days.map(day => ({ name: day, bookings: 0, revenue: 0 }));
    
    bookings.forEach(booking => {
      // Convert UTC date to Lesotho timezone (UTC+2)
      const utcDate = new Date(booking.startDateTime);
      const localDate = new Date(utcDate.getTime() + (2 * 60 * 60 * 1000)); // Add 2 hours for UTC+2
      
      if (localDate >= startOfWeek) {
        const dayIndex = localDate.getDay();
        data[dayIndex].bookings += 1;
        if (booking.status === 'ACCEPTED') {
          const servicePrice = booking.service?.price || 0;
          const houseCallFee = booking.houseCallFee || 0;
          const transportCost = booking.transportCost || 0;
          data[dayIndex].revenue += servicePrice + houseCallFee + transportCost;
        }
      }
    });
    
    // Reorder to start from Monday
    return [
      data[1], // Mon
      data[2], // Tue
      data[3], // Wed
      data[4], // Thu
      data[5], // Fri
      data[6], // Sat
      data[0], // Sun
    ];
  })();

  const statusData = [
    { name: 'Accepted', value: acceptedBookings, color: '#10b981' },
    { name: 'Pending', value: pendingBookings, color: '#f59e0b' },
    { name: 'Rejected', value: bookings.filter(b => b.status === 'REJECTED').length, color: '#ef4444' },
  ];

  const recentBookings = bookings
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-serif font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2 flex items-center gap-2">
          Welcome back!
          <Sparkles className="text-pink-500" size={28} />
        </h2>
        <p className="text-charcoal-600">
          Here&apos;s what&apos;s happening with your beauty parlour today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass border-2 border-pink-200 rounded-2xl p-6 hover:shadow-elevated transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
              >
                <stat.icon className="text-white" size={24} />
              </div>
              <span className="text-xs text-charcoal-500 bg-white px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold text-charcoal-800 mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-charcoal-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Bookings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 glass border-2 border-pink-200 rounded-2xl p-6"
        >
          <h3 className="text-xl font-serif font-bold text-charcoal-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-pink-500" size={24} />
            Weekly Performance
          </h3>
          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-75 text-center">
              <TrendingUp className="w-16 h-16 text-charcoal-300 mb-4" />
              <p className="text-charcoal-600 font-medium mb-2">No data yet</p>
              <p className="text-sm text-charcoal-500">
                Weekly performance will appear once you have bookings
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '2px solid #fbcfe8',
                    borderRadius: '12px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#ec4899"
                  strokeWidth={3}
                  dot={{ fill: '#ec4899', r: 5 }}
                  name="Bookings"
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={{ fill: '#a855f7', r: 5 }}
                  name="Revenue (M)"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass border-2 border-pink-200 rounded-2xl p-6"
        >
          <h3 className="text-xl font-serif font-bold text-charcoal-800 mb-6 flex items-center gap-2">
            <AlertCircle className="text-purple-500" size={24} />
            Booking Status
          </h3>
          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-75 text-center">
              <AlertCircle className="w-16 h-16 text-charcoal-300 mb-4" />
              <p className="text-charcoal-600 font-medium mb-2">No bookings yet</p>
              <p className="text-sm text-charcoal-500">
                Status distribution will appear once you have bookings
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ cx, cy, midAngle, outerRadius, percent }) => {
                    if (!midAngle || !percent) return null;
                    
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius + 25;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    
                    return (
                      <text 
                        x={x} 
                        y={y} 
                        fill="#374151" 
                        textAnchor={x > cx ? 'start' : 'end'} 
                        dominantBaseline="central"
                        className="text-sm font-semibold"
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span className="text-sm text-charcoal-700">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Recent Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="glass border-2 border-pink-200 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif font-bold text-charcoal-800 flex items-center gap-2">
            <Calendar className="text-pink-500" size={24} />
            Recent Bookings
          </h3>
          <Link
            href="/admin/bookings"
            className="text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-charcoal-600">Loading bookings...</p>
          </div>
        ) : recentBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-charcoal-300 mx-auto mb-4" />
            <p className="text-charcoal-600">No bookings yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-pink-200">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-charcoal-700">
                    Client
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-charcoal-700">
                    Service
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-charcoal-700">
                    Date & Time
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-charcoal-700">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-charcoal-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-pink-100 hover:bg-pink-50/50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-medium text-charcoal-800">
                          {booking.clientName}
                        </p>
                        <p className="text-xs text-charcoal-500">
                          {booking.clientEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-charcoal-600">
                      {booking.service?.name || 'N/A'}
                    </td>
                    <td className="px-4 py-4 text-sm text-charcoal-600">
                      {new Date(booking.startDateTime).toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'ACCEPTED'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {booking.status === 'ACCEPTED' && (
                          <CheckCircle size={14} />
                        )}
                        {booking.status === 'PENDING' && <Clock size={14} />}
                        {booking.status === 'REJECTED' && <XCircle size={14} />}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/admin/bookings/${booking._id}`}
                        className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Link
          href="/admin/bookings"
          className="glass border-2 border-pink-200 rounded-xl p-6 text-center hover:shadow-elevated hover:border-pink-300 transition-all group"
        >
          <Calendar className="w-8 h-8 text-pink-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-charcoal-700">
            Manage Bookings
          </p>
        </Link>
        <Link
          href="/admin/services"
          className="glass border-2 border-pink-200 rounded-xl p-6 text-center hover:shadow-elevated hover:border-pink-300 transition-all group"
        >
          <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-charcoal-700">
            Manage Services
          </p>
        </Link>
        <Link
          href="/admin/gallery"
          className="glass border-2 border-pink-200 rounded-xl p-6 text-center hover:shadow-elevated hover:border-pink-300 transition-all group"
        >
          <ImageIcon className="w-8 h-8 text-rose-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-charcoal-700">
            Update Gallery
          </p>
        </Link>
        <a
          href="#reports"
          className="glass border-2 border-pink-200 rounded-xl p-6 text-center hover:shadow-elevated hover:border-pink-300 transition-all group"
        >
          <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-charcoal-700">View Reports</p>
        </a>
      </motion.div>
    </div>
  );
}
