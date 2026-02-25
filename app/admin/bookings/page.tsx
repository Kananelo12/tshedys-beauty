"use client";

import { useState, useEffect } from 'react';
import { fromUTC } from '@/lib/availability';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  ChevronDown,
  Home,
  DollarSign,
} from 'lucide-react';

interface Service {
  name: string;
  duration: number;
  price: number;
}

interface Booking {
  _id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: Service;
  startDateTime: Date;
  endDateTime: Date;
  status: string;
  actionToken: string;
  isHouseCall?: boolean;
  houseCallFee?: number;
  transportCost?: number;
  totalPrice?: number;
}

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function AdminBookingsPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchBookings = () => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAction = async (bookingId: string, token: string, action: 'confirm' | 'reject') => {
    setProcessingId(bookingId);
    try {
      const response = await fetch(`/api/bookings/${bookingId}/${action}?token=${token}`);
      if (response.ok) {
        fetchBookings();
      } else {
        alert(`Failed to ${action} booking`);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setProcessingId(null);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'pending' && booking.status !== 'PENDING') return false;
    if (filter === 'accepted' && booking.status !== 'ACCEPTED') return false;
    if (filter === 'rejected' && booking.status !== 'REJECTED') return false;
    if (filter === 'today') {
      const today = new Date().toDateString();
      if (new Date(booking.startDateTime).toDateString() !== today) return false;
    }
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        booking.clientName.toLowerCase().includes(search) ||
        booking.clientEmail.toLowerCase().includes(search) ||
        booking.service?.name?.toLowerCase().includes(search)
      );
    }
    
    return true;
  });

  const pendingCount = bookings.filter(b => b.status === 'PENDING').length;
  const acceptedCount = bookings.filter(b => b.status === 'ACCEPTED').length;
  const todayCount = bookings.filter(b => {
    const today = new Date().toDateString();
    return new Date(b.startDateTime).toDateString() === today;
  }).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#EEECEA] border-t-foreground rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-foreground/40">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        {...fadeIn}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-serif font-medium text-foreground tracking-[-0.025em]">
            Bookings
          </h2>
          <p className="text-sm text-foreground/40 mt-1">Manage and review your appointments</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        {...fadeIn}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        <button
          onClick={() => setFilter('all')}
          className={`bg-white rounded-xl p-4 border transition-all text-left ${
            filter === 'all' ? 'border-foreground shadow-sm' : 'border-[#EEECEA] hover:border-foreground/20'
          }`}
        >
          <p className="text-2xl font-semibold text-foreground">{bookings.length}</p>
          <p className="text-xs text-foreground/35 mt-0.5">Total</p>
        </button>

        <button
          onClick={() => setFilter('pending')}
          className={`bg-white rounded-xl p-4 border transition-all text-left ${
            filter === 'pending' ? 'border-amber-400 shadow-sm' : 'border-[#EEECEA] hover:border-amber-200'
          }`}
        >
          <p className="text-2xl font-semibold text-foreground">{pendingCount}</p>
          <p className="text-xs text-foreground/35 mt-0.5">Pending</p>
        </button>

        <button
          onClick={() => setFilter('accepted')}
          className={`bg-white rounded-xl p-4 border transition-all text-left ${
            filter === 'accepted' ? 'border-emerald-400 shadow-sm' : 'border-[#EEECEA] hover:border-emerald-200'
          }`}
        >
          <p className="text-2xl font-semibold text-foreground">{acceptedCount}</p>
          <p className="text-xs text-foreground/35 mt-0.5">Accepted</p>
        </button>

        <button
          onClick={() => setFilter('today')}
          className={`bg-white rounded-xl p-4 border transition-all text-left ${
            filter === 'today' ? 'border-foreground shadow-sm' : 'border-[#EEECEA] hover:border-foreground/20'
          }`}
        >
          <p className="text-2xl font-semibold text-foreground">{todayCount}</p>
          <p className="text-xs text-foreground/35 mt-0.5">Today</p>
        </button>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        {...fadeIn}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white border border-[#EEECEA] rounded-xl p-4"
      >
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/25" size={18} />
            <input
              type="text"
              placeholder="Search by client name, email, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#EEECEA] rounded-xl text-sm focus:outline-none focus:border-foreground/30 bg-[#F5F4F2]/50 transition-colors"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/25" size={16} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 border border-[#EEECEA] rounded-xl text-sm focus:outline-none focus:border-foreground/30 bg-[#F5F4F2]/50 appearance-none transition-colors"
            >
              <option value="all">All Bookings</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="today">Today</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/25 pointer-events-none" size={14} />
          </div>
        </div>
      </motion.div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filteredBookings.length === 0 ? (
          <motion.div
            {...fadeIn}
            className="bg-white border border-[#EEECEA] rounded-xl p-12 text-center"
          >
            <Calendar className="w-12 h-12 text-foreground/10 mx-auto mb-4" />
            <h3 className="text-base font-medium text-foreground mb-1">No bookings found</h3>
            <p className="text-sm text-foreground/35">
              {searchTerm ? 'Try adjusting your search' : 'Bookings will appear here once customers make appointments'}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredBookings.map((booking, index) => {
              const { date, time } = fromUTC(new Date(booking.startDateTime));
              const isExpanded = expandedId === booking._id;
              const isPending = booking.status === 'PENDING';
              const isAccepted = booking.status === 'ACCEPTED';
              const isRejected = booking.status === 'REJECTED';
              const isProcessing = processingId === booking._id;

              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white border border-[#EEECEA] rounded-xl overflow-hidden transition-all hover:shadow-sm"
                >
                  <div className="p-4 md:p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Client Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            isPending ? 'bg-amber-400' :
                            isAccepted ? 'bg-foreground' :
                            'bg-foreground/20'
                          }`}>
                            {booking.clientName.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-foreground truncate">
                              {booking.clientName}
                            </h3>
                            <p className="text-xs text-foreground/40 truncate">
                              {booking.service?.name || 'Unknown Service'}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                          <div className="flex items-center gap-1.5 text-foreground/40">
                            <Calendar size={13} />
                            <span>{date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-foreground/40">
                            <Clock size={13} />
                            <span>{time}</span>
                          </div>
                          {booking.isHouseCall && (
                            <div className="flex items-center gap-1.5 text-foreground/40">
                              <Home size={13} />
                              <span>House Call</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex flex-col items-end gap-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full ${
                          isAccepted ? 'bg-emerald-50 text-emerald-600' :
                          isPending ? 'bg-amber-50 text-amber-600' :
                          'bg-[#F5F4F2] text-foreground/40'
                        }`}>
                          {isAccepted && <CheckCircle size={12} />}
                          {isPending && <Clock size={12} />}
                          {isRejected && <XCircle size={12} />}
                          {booking.status}
                        </span>

                        <div className="flex flex-wrap gap-2">
                          {isPending && (
                            <>
                              <button
                                onClick={() => handleAction(booking._id, booking.actionToken, 'confirm')}
                                disabled={isProcessing}
                                className="flex items-center gap-1 px-3.5 py-2 bg-foreground hover:bg-foreground/90 text-white text-xs font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <CheckCircle size={14} />
                                Accept
                              </button>
                              <button
                                onClick={() => handleAction(booking._id, booking.actionToken, 'reject')}
                                disabled={isProcessing}
                                className="flex items-center gap-1 px-3.5 py-2 bg-[#F5F4F2] hover:bg-[#EEECEA] text-foreground/60 text-xs font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <XCircle size={14} />
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : booking._id)}
                            className="flex items-center gap-1 px-3.5 py-2 bg-white border border-[#EEECEA] text-foreground/50 text-xs font-medium rounded-lg hover:border-foreground/20 transition-all"
                          >
                            {isExpanded ? 'Less' : 'More'}
                            <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-4 pt-4 border-t border-[#EEECEA]"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <h4 className="text-xs font-semibold text-foreground/35 uppercase tracking-wider flex items-center gap-1.5">
                                <User size={13} />
                                Contact Details
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-foreground/50">
                                  <Mail size={13} />
                                  <span className="truncate">{booking.clientEmail}</span>
                                </div>
                                <div className="flex items-center gap-2 text-foreground/50">
                                  <Phone size={13} />
                                  <span>{booking.clientPhone}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <h4 className="text-xs font-semibold text-foreground/35 uppercase tracking-wider flex items-center gap-1.5">
                                <DollarSign size={13} />
                                Pricing Details
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-foreground/40">Service Price:</span>
                                  <span className="font-medium text-foreground">M{booking.service?.price || 0}</span>
                                </div>
                                {booking.isHouseCall && (
                                  <>
                                    <div className="flex justify-between">
                                      <span className="text-foreground/40">House Call Fee:</span>
                                      <span className="font-medium text-foreground">M{booking.houseCallFee || 0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-foreground/40">Transport:</span>
                                      <span className="font-medium text-foreground">M{booking.transportCost || 0}</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-[#EEECEA]">
                                      <span className="font-semibold text-foreground">Total:</span>
                                      <span className="font-bold text-foreground">
                                        M{(booking.service?.price || 0) + (booking.houseCallFee || 0) + (booking.transportCost || 0)}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-[#EEECEA]">
                            <Link
                              href={`/admin/bookings/${booking._id}`}
                              className="text-xs text-foreground/40 hover:text-foreground font-medium transition-colors"
                            >
                              View Full Details →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
