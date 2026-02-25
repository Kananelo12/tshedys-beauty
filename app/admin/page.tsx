"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Sparkles,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
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

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBookings(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  }, []);

  // Calculate stats (convert UTC to Lesotho timezone UTC+2)
  const todayBookings = bookings.filter((b) => {
    const utcDate = new Date(b.startDateTime);
    const localDate = new Date(utcDate.getTime() + 2 * 60 * 60 * 1000);
    const today = new Date();
    return localDate.toDateString() === today.toDateString();
  }).length;

  const yesterdayBookings = bookings.filter((b) => {
    const utcDate = new Date(b.startDateTime);
    const localDate = new Date(utcDate.getTime() + 2 * 60 * 60 * 1000);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return localDate.toDateString() === yesterday.toDateString();
  }).length;

  const pendingBookings = bookings.filter((b) => b.status === "PENDING").length;
  const acceptedBookings = bookings.filter(
    (b) => b.status === "ACCEPTED",
  ).length;

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfWeek.getDate() - 7);

  const thisWeekBookings = bookings.filter((b) => {
    const utcDate = new Date(b.startDateTime);
    const localDate = new Date(utcDate.getTime() + 2 * 60 * 60 * 1000);
    return localDate >= startOfWeek && b.status === "ACCEPTED";
  }).length;

  const lastWeekBookings = bookings.filter((b) => {
    const utcDate = new Date(b.startDateTime);
    const localDate = new Date(utcDate.getTime() + 2 * 60 * 60 * 1000);
    return (
      localDate >= startOfLastWeek &&
      localDate < startOfWeek &&
      b.status === "ACCEPTED"
    );
  }).length;

  const weeklyChange =
    lastWeekBookings > 0
      ? (
          ((thisWeekBookings - lastWeekBookings) / lastWeekBookings) *
          100
        ).toFixed(1)
      : "0";

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const thisMonthRevenue = bookings
    .filter((b) => {
      const utcDate = new Date(b.startDateTime);
      const localDate = new Date(utcDate.getTime() + 2 * 60 * 60 * 1000);
      return localDate >= startOfMonth && b.status === "ACCEPTED";
    })
    .reduce((sum, b) => {
      const servicePrice = b.service?.price || 0;
      const houseCallFee = b.houseCallFee || 0;
      const transportCost = b.transportCost || 0;
      return sum + servicePrice + houseCallFee + transportCost;
    }, 0);

  const lastMonthRevenue = bookings
    .filter((b) => {
      const utcDate = new Date(b.startDateTime);
      const localDate = new Date(utcDate.getTime() + 2 * 60 * 60 * 1000);
      return (
        localDate >= startOfLastMonth &&
        localDate <= endOfLastMonth &&
        b.status === "ACCEPTED"
      );
    })
    .reduce((sum, b) => {
      const servicePrice = b.service?.price || 0;
      const houseCallFee = b.houseCallFee || 0;
      const transportCost = b.transportCost || 0;
      return sum + servicePrice + houseCallFee + transportCost;
    }, 0);

  const monthlyChange =
    lastMonthRevenue > 0
      ? (
          ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) *
          100
        ).toFixed(1)
      : "0";

  const totalRevenue = bookings
    .filter((b) => b.status === "ACCEPTED")
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
      change:
        todayBookings > yesterdayBookings
          ? `+${todayBookings - yesterdayBookings} from yesterday`
          : yesterdayBookings > todayBookings
            ? `-${yesterdayBookings - todayBookings} from yesterday`
            : "Same as yesterday",
      up: todayBookings >= yesterdayBookings,
    },
    {
      label: "Pending Requests",
      value: pendingBookings.toString(),
      icon: Clock,
      change: pendingBookings > 0 ? "Awaiting response" : "All clear",
      up: false,
    },
    {
      label: "Confirmed",
      value: acceptedBookings.toString(),
      icon: CheckCircle,
      change:
        weeklyChange !== "0"
          ? `${Number(weeklyChange) > 0 ? "+" : ""}${weeklyChange}% this week`
          : "No change this week",
      up: Number(weeklyChange) >= 0,
    },
    {
      label: "Total Revenue",
      value: `M${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      change:
        monthlyChange !== "0"
          ? `${Number(monthlyChange) > 0 ? "+" : ""}${monthlyChange}% this month`
          : "No change this month",
      up: Number(monthlyChange) >= 0,
    },
  ];

  // Calculate weekly data from real bookings
  const weeklyData = (() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const data = days.map((day) => ({ name: day, bookings: 0, revenue: 0 }));

    bookings.forEach((booking) => {
      const utcDate = new Date(booking.startDateTime);
      const localDate = new Date(utcDate.getTime() + 2 * 60 * 60 * 1000);

      if (localDate >= startOfWeek) {
        const dayIndex = localDate.getDay();
        data[dayIndex].bookings += 1;
        if (booking.status === "ACCEPTED") {
          const servicePrice = booking.service?.price || 0;
          const houseCallFee = booking.houseCallFee || 0;
          const transportCost = booking.transportCost || 0;
          data[dayIndex].revenue += servicePrice + houseCallFee + transportCost;
        }
      }
    });

    return [data[1], data[2], data[3], data[4], data[5], data[6], data[0]];
  })();

  const statusData = [
    { name: "Accepted", value: acceptedBookings, color: "#2C2C2C" },
    { name: "Pending", value: pendingBookings, color: "#D4576E" },
    {
      name: "Rejected",
      value: bookings.filter((b) => b.status === "REJECTED").length,
      color: "#CCCAC4",
    },
  ];

  const recentBookings = bookings
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeIn} transition={{ duration: 0.4 }}>
        <h2 className="text-2xl font-serif font-medium text-foreground tracking-[-0.025em]">
          Welcome back
        </h2>
        <p className="text-sm text-foreground/40 mt-1">
          Here&apos;s what&apos;s happening with your beauty parlour today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            {...fadeIn}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-white border border-[#EEECEA] rounded-2xl p-5 hover:shadow-sm transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5F4F2] flex items-center justify-center">
                <stat.icon className="text-foreground/50" size={18} />
              </div>
              {stat.change && (
                <span className="flex items-center gap-0.5 text-[11px] text-foreground/35">
                  {stat.up ? (
                    <ArrowUpRight size={12} className="text-emerald-500" />
                  ) : (
                    <ArrowDownRight size={12} className="text-foreground/25" />
                  )}
                </span>
              )}
            </div>
            <p className="text-2xl font-semibold text-foreground tracking-tight">
              {stat.value}
            </p>
            <p className="text-xs text-foreground/35 mt-1">{stat.label}</p>
            <p className="text-[11px] text-foreground/25 mt-0.5">
              {stat.change}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly Bookings Chart */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2 bg-white border border-[#EEECEA] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-foreground">
              Weekly Performance
            </h3>
            <TrendingUp className="text-foreground/25" size={16} />
          </div>
          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-75 text-center">
              <TrendingUp className="w-12 h-12 text-foreground/10 mb-4" />
              <p className="text-sm text-foreground/50 font-medium mb-1">No data yet</p>
              <p className="text-xs text-foreground/30">
                Weekly performance will appear once you have bookings
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EFED" />
                <XAxis dataKey="name" stroke="#AEACA6" fontSize={12} />
                <YAxis stroke="#AEACA6" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #EEECEA",
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#2C2C2C"
                  strokeWidth={2}
                  dot={{ fill: "#2C2C2C", r: 4 }}
                  name="Bookings"
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#D4576E"
                  strokeWidth={2}
                  dot={{ fill: "#D4576E", r: 4 }}
                  name="Revenue (M)"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Status Distribution */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white border border-[#EEECEA] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-foreground">
              Booking Status
            </h3>
            <AlertCircle className="text-foreground/25" size={16} />
          </div>
          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-75 text-center">
              <AlertCircle className="w-12 h-12 text-foreground/10 mb-4" />
              <p className="text-sm text-foreground/50 font-medium mb-1">No bookings yet</p>
              <p className="text-xs text-foreground/30">
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
                        fill="#2C2C2C"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                        className="text-xs font-medium"
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                  outerRadius={90}
                  fill="#2C2C2C"
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
                    <span className="text-xs text-foreground/60">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Recent Bookings Table */}
      <motion.div
        {...fadeIn}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white border border-[#EEECEA] rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-foreground">
            Recent Bookings
          </h3>
          <Link
            href="/admin/bookings"
            className="text-xs text-foreground/40 hover:text-foreground font-medium transition-colors"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-[#EEECEA] border-t-foreground rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-foreground/40">Loading bookings...</p>
          </div>
        ) : recentBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-foreground/10 mx-auto mb-4" />
            <p className="text-sm text-foreground/40">No bookings yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#EEECEA]">
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-foreground/35 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-foreground/35 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-foreground/35 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-foreground/35 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-[11px] font-semibold text-foreground/35 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-[#F5F4F2] hover:bg-[#FAFAF8] transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {booking.clientName}
                        </p>
                        <p className="text-xs text-foreground/30">
                          {booking.clientEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground/60">
                      {booking.service?.name || "N/A"}
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground/60">
                      {new Date(booking.startDateTime).toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full ${
                          booking.status === "ACCEPTED"
                            ? "bg-emerald-50 text-emerald-600"
                            : booking.status === "PENDING"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-[#F5F4F2] text-foreground/40"
                        }`}
                      >
                        {booking.status === "ACCEPTED" && (
                          <CheckCircle size={12} />
                        )}
                        {booking.status === "PENDING" && <Clock size={12} />}
                        {booking.status === "REJECTED" && <XCircle size={12} />}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/admin/bookings/${booking._id}`}
                        className="text-xs text-foreground/40 hover:text-foreground font-medium transition-colors"
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
        {...fadeIn}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="grid grid-cols-3 gap-4"
      >
        <Link
          href="/admin/bookings"
          className="bg-white border border-[#EEECEA] rounded-2xl p-5 hover:shadow-sm hover:border-foreground/10 transition-all group"
        >
          <Calendar className="w-5 h-5 text-foreground/30 mb-3 group-hover:text-foreground transition-colors" />
          <p className="text-sm font-medium text-foreground">Manage Bookings</p>
          <p className="text-xs text-foreground/30 mt-0.5">View & manage all appointments</p>
        </Link>
        <Link
          href="/admin/services"
          className="bg-white border border-[#EEECEA] rounded-2xl p-5 hover:shadow-sm hover:border-foreground/10 transition-all group"
        >
          <Sparkles className="w-5 h-5 text-foreground/30 mb-3 group-hover:text-foreground transition-colors" />
          <p className="text-sm font-medium text-foreground">Manage Services</p>
          <p className="text-xs text-foreground/30 mt-0.5">Add, edit or remove services</p>
        </Link>
        <Link
          href="/admin/settings"
          className="bg-white border border-[#EEECEA] rounded-2xl p-5 hover:shadow-sm hover:border-foreground/10 transition-all group"
        >
          <TrendingUp className="w-5 h-5 text-foreground/30 mb-3 group-hover:text-foreground transition-colors" />
          <p className="text-sm font-medium text-foreground">Settings</p>
          <p className="text-xs text-foreground/30 mt-0.5">Configure providers & preferences</p>
        </Link>
      </motion.div>
    </div>
  );
}
