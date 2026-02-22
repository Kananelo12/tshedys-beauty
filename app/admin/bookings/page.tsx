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
  Sparkles,
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
        // Refresh bookings
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
    // Apply status filter
    if (filter === 'pending' && booking.status !== 'PENDING') return false;
    if (filter === 'accepted' && booking.status !== 'ACCEPTED') return false;
    if (filter === 'rejected' && booking.status !== 'REJECTED') return false;
    if (filter === 'today') {
      const today = new Date().toDateString();
      if (new Date(booking.startDateTime).toDateString() !== today) return false;
    }
    
    // Apply search filter
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
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading bookings...</p>
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
            <Calendar className="text-pink-500" size={32} />
            Bookings
          </h2>
          <p className="text-gray-600 mt-1">Manage and review your appointments</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <button
          onClick={() => setFilter('all')}
          className={`glass rounded-xl p-4 border-2 transition-all ${
            filter === 'all' ? 'border-pink-400 shadow-lg' : 'border-pink-200 hover:border-pink-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
            <Calendar className="text-pink-500" size={24} />
          </div>
        </button>

        <button
          onClick={() => setFilter('pending')}
          className={`glass rounded-xl p-4 border-2 transition-all ${
            filter === 'pending' ? 'border-yellow-400 shadow-lg' : 'border-pink-200 hover:border-yellow-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <Clock className="text-yellow-500" size={24} />
          </div>
        </button>

        <button
          onClick={() => setFilter('accepted')}
          className={`glass rounded-xl p-4 border-2 transition-all ${
            filter === 'accepted' ? 'border-green-400 shadow-lg' : 'border-pink-200 hover:border-green-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{acceptedCount}</p>
              <p className="text-sm text-gray-600">Accepted</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </button>

        <button
          onClick={() => setFilter('today')}
          className={`glass rounded-xl p-4 border-2 transition-all ${
            filter === 'today' ? 'border-pink-400 shadow-lg' : 'border-pink-200 hover:border-pink-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{todayCount}</p>
              <p className="text-sm text-gray-600">Today</p>
            </div>
            <Sparkles className="text-pink-500" size={24} />
          </div>
        </button>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass border-2 border-pink-200 rounded-xl p-4"
      >
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by client name, email, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white appearance-none"
            >
              <option value="all">All Bookings</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="today">Today</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </motion.div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass border-2 border-pink-200 rounded-xl p-12 text-center"
          >
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-medium text-gray-700 mb-2">No bookings found</h3>
            <p className="text-gray-500">
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass border-2 rounded-xl overflow-hidden transition-all ${
                    isPending ? 'border-yellow-300' : 
                    isAccepted ? 'border-green-300' : 
                    isRejected ? 'border-red-300' : 'border-pink-200'
                  }`}
                >
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Client Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                            isPending ? 'bg-linear-to-br from-yellow-400 to-orange-500' :
                            isAccepted ? 'bg-linear-to-br from-green-400 to-emerald-500' :
                            'bg-linear-to-br from-red-400 to-pink-500'
                          }`}>
                            {booking.clientName.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {booking.clientName}
                            </h3>
                            <p className="text-sm text-gray-600 truncate flex items-center gap-1">
                              <Sparkles size={14} className="text-pink-500" />
                              {booking.service?.name || 'Unknown Service'}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={16} className="text-pink-500" />
                            <span>{date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={16} className="text-pink-500" />
                            <span>{time}</span>
                          </div>
                          {booking.isHouseCall && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Home size={16} className="text-orange-500" />
                              <span>House Call</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex flex-col items-end gap-3">
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full ${
                          isAccepted ? 'bg-green-100 text-green-700' :
                          isPending ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {isAccepted && <CheckCircle size={14} />}
                          {isPending && <Clock size={14} />}
                          {isRejected && <XCircle size={14} />}
                          {booking.status}
                        </span>

                        <div className="flex flex-wrap gap-2">
                          {isPending && (
                            <>
                              <button
                                onClick={() => handleAction(booking._id, booking.actionToken, 'confirm')}
                                disabled={isProcessing}
                                className="flex items-center gap-1 px-4 py-2 bg-linear-to-r from-green-500 to-emerald-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <CheckCircle size={16} />
                                Accept
                              </button>
                              <button
                                onClick={() => handleAction(booking._id, booking.actionToken, 'reject')}
                                disabled={isProcessing}
                                className="flex items-center gap-1 px-4 py-2 bg-linear-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <XCircle size={16} />
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : booking._id)}
                            className="flex items-center gap-1 px-4 py-2 bg-white border-2 border-pink-300 text-pink-600 text-sm font-medium rounded-lg hover:bg-pink-50 transition-all"
                          >
                            {isExpanded ? 'Less' : 'More'}
                            <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
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
                          className="mt-4 pt-4 border-t-2 border-pink-200"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                                <User size={16} className="text-pink-500" />
                                Contact Details
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Mail size={14} className="text-pink-500" />
                                  <span className="truncate">{booking.clientEmail}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Phone size={14} className="text-green-500" />
                                  <span>{booking.clientPhone}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                                <DollarSign size={16} className="text-pink-500" />
                                Pricing Details
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Service Price:</span>
                                  <span className="font-medium">M{booking.service?.price || 0}</span>
                                </div>
                                {booking.isHouseCall && (
                                  <>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">House Call Fee:</span>
                                      <span className="font-medium">M{booking.houseCallFee || 0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Transport:</span>
                                      <span className="font-medium">M{booking.transportCost || 0}</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-pink-200">
                                      <span className="font-semibold text-gray-700">Total:</span>
                                      <span className="font-bold text-pink-600">
                                        M{(booking.service?.price || 0) + (booking.houseCallFee || 0) + (booking.transportCost || 0)}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t-2 border-pink-200">
                            <Link
                              href={`/admin/bookings/${booking._id}`}
                              className="inline-flex items-center gap-2 text-sm text-pink-600 hover:text-pink-700 font-medium"
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
