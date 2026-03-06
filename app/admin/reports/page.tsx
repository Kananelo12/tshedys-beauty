"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fromUTC } from "@/lib/availability";
import {
  BarChart,
  Bar,
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
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Filter,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  BarChart3,
} from "lucide-react";

interface Service {
  name: string;
  price: number;
  category?: string;
}

interface Booking {
  _id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: Service;
  startDateTime: string;
  endDateTime: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  isHouseCall?: boolean;
  houseCallFee?: number;
  transportCost?: number;
  createdAt: string;
}

type DateRange = "all" | "7d" | "30d" | "90d" | "12m" | "custom";

export default function AdminReportsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Derive local date from UTC
  const toLocal = (utc: string) => {
    const d = new Date(utc);
    return new Date(d.getTime() + 2 * 60 * 60 * 1000); // UTC+2
  };

  // Unique service names for filter dropdown
  const serviceNames = [...new Set(bookings.map((b) => b.service?.name).filter(Boolean))].sort();

  // Filtered bookings
  const filtered = (() => {
    const now = new Date();
    return bookings.filter((b) => {
      // Date range
      if (dateRange !== "all" && dateRange !== "custom") {
        const local = toLocal(b.startDateTime);
        const daysMap: Record<string, number> = { "7d": 7, "30d": 30, "90d": 90, "12m": 365 };
        const days = daysMap[dateRange];
        const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        if (local < cutoff) return false;
      }
      if (dateRange === "custom") {
        const local = toLocal(b.startDateTime);
        if (customFrom && local < new Date(customFrom)) return false;
        if (customTo) {
          const to = new Date(customTo);
          to.setHours(23, 59, 59, 999);
          if (local > to) return false;
        }
      }
      // Status
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      // Service
      if (serviceFilter !== "all" && b.service?.name !== serviceFilter) return false;
      return true;
    });
  })();

  // ---------- KPIs ----------
  const totalBookings = filtered.length;
  const accepted = filtered.filter((b) => b.status === "ACCEPTED");
  const pending = filtered.filter((b) => b.status === "PENDING");
  const rejected = filtered.filter((b) => b.status === "REJECTED");

  const totalRevenue = accepted.reduce((sum, b) => {
    return sum + (b.service?.price || 0) + (b.houseCallFee || 0) + (b.transportCost || 0);
  }, 0);

  const avgRevenue = accepted.length > 0 ? totalRevenue / accepted.length : 0;

  const uniqueClients = new Set(filtered.map((b) => b.clientEmail.toLowerCase())).size;

  const acceptanceRate =
    totalBookings > 0 ? ((accepted.length / totalBookings) * 100).toFixed(1) : "0";

  // ---------- Revenue over time (monthly) ----------
  const revenueByMonth = (() => {
    const map = new Map<string, { revenue: number; bookings: number }>();
    accepted.forEach((b) => {
      const { date } = fromUTC(new Date(b.startDateTime));
      const month = date.slice(0, 7); // YYYY-MM
      const prev = map.get(month) || { revenue: 0, bookings: 0 };
      prev.revenue += (b.service?.price || 0) + (b.houseCallFee || 0) + (b.transportCost || 0);
      prev.bookings += 1;
      map.set(month, prev);
    });
    return [...map.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month: formatMonth(month),
        revenue: data.revenue,
        bookings: data.bookings,
      }));
  })();

  // ---------- Bookings by status (pie) ----------
  const statusData = [
    { name: "Accepted", value: accepted.length, color: "#10B981" },
    { name: "Pending", value: pending.length, color: "#F59E0B" },
    { name: "Rejected", value: rejected.length, color: "#9CA3AF" },
  ].filter((d) => d.value > 0);

  // ---------- Top services (bar) ----------
  const topServices = (() => {
    const map = new Map<string, { count: number; revenue: number }>();
    filtered.forEach((b) => {
      const name = b.service?.name || "Unknown";
      const prev = map.get(name) || { count: 0, revenue: 0 };
      prev.count += 1;
      if (b.status === "ACCEPTED") {
        prev.revenue += (b.service?.price || 0) + (b.houseCallFee || 0) + (b.transportCost || 0);
      }
      map.set(name, prev);
    });
    return [...map.entries()]
      .map(([name, data]) => ({ name: truncate(name, 20), count: data.count, revenue: data.revenue }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  })();

  // ---------- Bookings by day of week (bar) ----------
  const byDayOfWeek = (() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const counts = days.map((d) => ({ day: d, count: 0 }));
    filtered.forEach((b) => {
      const local = toLocal(b.startDateTime);
      counts[local.getDay()].count += 1;
    });
    // Reorder Mon–Sun
    return [...counts.slice(1), counts[0]];
  })();

  // ---------- House call stats ----------
  const houseCallCount = filtered.filter((b) => b.isHouseCall).length;
  const houseCallRevenue = accepted
    .filter((b) => b.isHouseCall)
    .reduce((sum, b) => sum + (b.houseCallFee || 0) + (b.transportCost || 0), 0);

  // ---------- CSV export ----------
  const exportCSV = () => {
    const headers = ["Client", "Email", "Phone", "Service", "Date", "Time", "Status", "Price", "House Call", "Total"];
    const rows = filtered.map((b) => {
      const { date, time } = fromUTC(new Date(b.startDateTime));
      const price = b.service?.price || 0;
      const total = price + (b.houseCallFee || 0) + (b.transportCost || 0);
      return [
        b.clientName,
        b.clientEmail,
        b.clientPhone,
        b.service?.name || "",
        date,
        time,
        b.status,
        price.toString(),
        b.isHouseCall ? "Yes" : "No",
        total.toString(),
      ];
    });

    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tshedy-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-serif font-bold bg-linear-to-r from-pink-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
            <BarChart3 className="text-pink-500" size={32} />
            Reports
          </h2>
          <p className="text-gray-600 mt-1">All-time analytics and performance insights</p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Download size={16} />
          Export CSV
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white border border-gray-200 rounded-xl p-4"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          <Filter size={16} />
          Filters
        </div>
        <div className="flex flex-col md:flex-row flex-wrap gap-3">
          {/* Date range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as DateRange)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="all">All Time</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="12m">Last 12 Months</option>
            <option value="custom">Custom Range</option>
          </select>

          {dateRange === "custom" && (
            <>
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <span className="self-center text-gray-400 text-sm">to</span>
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </>
          )}

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="all">All Statuses</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {/* Service */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="all">All Services</option>
            {serviceNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <KPICard label="Total Bookings" value={totalBookings.toString()} icon={Calendar} />
        <KPICard label="Total Revenue" value={`M${totalRevenue.toFixed(2)}`} icon={DollarSign} />
        <KPICard label="Unique Clients" value={uniqueClients.toString()} icon={Users} />
        <KPICard label="Acceptance Rate" value={`${acceptanceRate}%`} icon={TrendingUp} />
      </motion.div>

      {/* Status breakdown mini cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        <MiniStat label="Accepted" value={accepted.length} icon={CheckCircle} color="text-emerald-600" bg="bg-emerald-50" />
        <MiniStat label="Pending" value={pending.length} icon={Clock} color="text-amber-600" bg="bg-amber-50" />
        <MiniStat label="Rejected" value={rejected.length} icon={XCircle} color="text-gray-500" bg="bg-gray-50" />
        <MiniStat label="Avg Revenue" value={`M${avgRevenue.toFixed(0)}`} icon={DollarSign} color="text-pink-600" bg="bg-pink-50" />
        <MiniStat label="House Calls" value={houseCallCount} icon={Calendar} color="text-amber-600" bg="bg-amber-50" sub={houseCallRevenue > 0 ? `+M${houseCallRevenue.toFixed(0)} fees` : undefined} />
      </motion.div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue over time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-gray-400" />
            Revenue Over Time
          </h3>
          {revenueByMonth.length === 0 ? (
            <EmptyChart message="No accepted bookings to chart" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "8px" }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any, name: any) => [
                    name === "revenue" ? `M${Number(value).toFixed(2)}` : value,
                    name === "revenue" ? "Revenue" : "Bookings",
                  ]}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#EC4899" strokeWidth={2} dot={{ fill: "#EC4899", r: 4 }} name="Revenue (M)" />
                <Line type="monotone" dataKey="bookings" stroke="#64748B" strokeWidth={2} dot={{ fill: "#64748B", r: 4 }} name="Bookings" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Status pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white border border-gray-200 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={20} className="text-gray-400" />
            Status Distribution
          </h3>
          {statusData.length === 0 ? (
            <EmptyChart message="No bookings to display" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ cx, cy, midAngle, outerRadius, percent }) => {
                    if (!percent || !midAngle) return null;
                    const RADIAN = Math.PI / 180;
                    const radius = (outerRadius ?? 90) + 25;
                    const x = (cx ?? 0) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
                    const y = (cy ?? 0) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
                    return (
                      <text x={x} y={y} fill="#374151" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" className="text-sm font-medium">
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                  outerRadius={90}
                  dataKey="value"
                >
                  {statusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-sm text-gray-700">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-gray-400" />
            Top Services
          </h3>
          {topServices.length === 0 ? (
            <EmptyChart message="No service data" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topServices} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" stroke="#6b7280" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" stroke="#6b7280" tick={{ fontSize: 11 }} width={120} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "8px" }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any, name: any) => [name === "revenue" ? `M${Number(value).toFixed(2)}` : value, name === "revenue" ? "Revenue" : "Bookings"]}
                />
                <Legend />
                <Bar dataKey="count" fill="#EC4899" radius={[0, 4, 4, 0]} name="Bookings" />
                <Bar dataKey="revenue" fill="#64748B" radius={[0, 4, 4, 0]} name="Revenue (M)" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Bookings by day of week */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white border border-gray-200 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-gray-400" />
            Bookings by Day of Week
          </h3>
          {filtered.length === 0 ? (
            <EmptyChart message="No bookings to chart" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={byDayOfWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#6b7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "8px" }} />
                <Bar dataKey="count" fill="#EC4899" radius={[4, 4, 0, 0]} name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Data table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white border border-gray-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Booking Details ({filtered.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-3 py-2.5 font-semibold text-gray-700">Client</th>
                <th className="text-left px-3 py-2.5 font-semibold text-gray-700">Service</th>
                <th className="text-left px-3 py-2.5 font-semibold text-gray-700">Date</th>
                <th className="text-left px-3 py-2.5 font-semibold text-gray-700">Time</th>
                <th className="text-left px-3 py-2.5 font-semibold text-gray-700">Status</th>
                <th className="text-right px-3 py-2.5 font-semibold text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center text-gray-500">
                    No bookings match your filters
                  </td>
                </tr>
              ) : (
                filtered.slice(0, 50).map((b) => {
                  const { date, time } = fromUTC(new Date(b.startDateTime));
                  const total = (b.service?.price || 0) + (b.houseCallFee || 0) + (b.transportCost || 0);
                  return (
                    <tr key={b._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3">
                        <p className="font-medium text-gray-900">{b.clientName}</p>
                        <p className="text-xs text-gray-500">{b.clientEmail}</p>
                      </td>
                      <td className="px-3 py-3 text-gray-600">{b.service?.name || "N/A"}</td>
                      <td className="px-3 py-3 text-gray-600">{date}</td>
                      <td className="px-3 py-3 text-gray-600">{time}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full ${
                            b.status === "ACCEPTED"
                              ? "bg-emerald-50 text-emerald-700"
                              : b.status === "PENDING"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {b.status === "ACCEPTED" && <CheckCircle size={12} />}
                          {b.status === "PENDING" && <Clock size={12} />}
                          {b.status === "REJECTED" && <XCircle size={12} />}
                          {b.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right font-medium text-gray-900">M{total.toFixed(2)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {filtered.length > 50 && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Showing 50 of {filtered.length} bookings. Export CSV for full data.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ---------- Helper components ----------

function KPICard({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center">
          <Icon className="text-white" size={20} />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600 mt-0.5">{label}</p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  icon: Icon,
  color,
  bg,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bg: string;
  sub?: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3">
      <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center shrink-0`}>
        <Icon size={16} className={color} />
      </div>
      <div className="min-w-0">
        <p className="text-lg font-bold text-gray-900 leading-tight">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
  );
}

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-60 text-center">
      <BarChart3 className="w-12 h-12 text-gray-200 mb-3" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

function formatMonth(ym: string) {
  const [y, m] = ym.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(m) - 1]} ${y}`;
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n) + "…" : s;
}
