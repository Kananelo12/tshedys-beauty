import { notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { fromUTC } from '@/lib/availability';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Sparkles,
  Home,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building,
  ArrowLeft,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db('tshedybeauty');

  const booking = await db.collection('bookings').findOne({
    _id: new ObjectId(id),
  });

  if (!booking) {
    notFound();
  }

  const service = await db.collection('services').findOne({ _id: new ObjectId(booking.serviceId) });
  const provider = await db.collection('providers').findOne({ _id: new ObjectId(booking.providerId) });

  if (!service || !provider) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass border-2 border-red-300 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-serif font-medium text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600">Service or provider not found.</p>
        </div>
      </div>
    );
  }

  const { date, time } = fromUTC(booking.startDateTime);
  const { time: endTime } = fromUTC(booking.endDateTime);
  const isAccepted = booking.status === 'ACCEPTED';
  const isRejected = booking.status === 'REJECTED';
  const isPending = booking.status === 'PENDING';

  const totalPrice = service.price + (booking.houseCallFee || 0) + (booking.transportCost || 0);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/admin/bookings"
        className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Bookings
      </Link>

      {/* Header Card */}
      <div className="glass border-2 border-pink-200 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold bg-linear-to-r from-pink-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Booking Details
            </h1>
            <p className="text-sm text-gray-500">ID: {booking._id.toString()}</p>
          </div>
          <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full self-start ${
            isAccepted ? 'bg-pink-100 text-pink-700' :
            isRejected ? 'bg-gray-100 text-gray-600' :
            'bg-gold-100 text-gold-700'
          }`}>
            {isAccepted && <CheckCircle size={16} />}
            {isPending && <Clock size={16} />}
            {isRejected && <XCircle size={16} />}
            {booking.status}
          </span>
        </div>

        {/* Quick Actions for Pending */}
        {isPending && (
          <div className="flex flex-wrap gap-3 p-4 bg-gold-50 border-2 border-gold-200 rounded-xl">
            <div className="flex-1 flex items-center gap-3">
              <AlertCircle className="text-gold-600" size={24} />
              <div>
                <p className="font-semibold text-gold-800">Action Required</p>
                <p className="text-sm text-gold-700">This booking is awaiting your response</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={`/api/bookings/${id}/confirm?token=${booking.actionToken}`}
                className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
              >
                <CheckCircle size={18} />
                Accept
              </a>
              <a
                href={`/api/bookings/${id}/reject?token=${booking.actionToken}`}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
              >
                <XCircle size={18} />
                Reject
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Information */}
        <div className="glass border-2 border-pink-200 rounded-2xl p-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="text-pink-500" size={24} />
            Client Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-cream-50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-pink-400 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                {booking.clientName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-semibold text-gray-900">{booking.clientName}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-cream-50 rounded-lg">
              <Mail className="text-pink-500 mt-0.5" size={20} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-900 truncate">{booking.clientEmail}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-cream-50 rounded-lg">
              <Phone className="text-pink-500 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-900">{booking.clientPhone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="glass border-2 border-pink-200 rounded-2xl p-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Sparkles className="text-pink-500" size={24} />
            Service Details
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-linear-to-br from-pink-50 to-pink-50 rounded-lg border-2 border-pink-200">
              <p className="text-sm text-gray-500 mb-1">Service</p>
              <p className="font-bold text-lg text-gray-900">{service.name}</p>
              {service.category && (
                <span className="inline-block mt-2 px-2 py-1 bg-white text-xs font-medium text-pink-600 rounded-full">
                  {service.category}
                </span>
              )}
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-cream-50 rounded-lg">
              <Calendar className="text-pink-500 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold text-gray-900">{date}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-cream-50 rounded-lg">
              <Clock className="text-pink-500 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-semibold text-gray-900">{time} - {endTime}</p>
                <p className="text-xs text-gray-500 mt-1">{service.duration} minutes</p>
              </div>
            </div>
            
            {booking.isHouseCall && (
              <div className="flex items-start gap-3 p-4 bg-gold-50 border-2 border-gold-200 rounded-lg">
                <Home className="text-gold-600 mt-0.5" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gold-800">House Call Service</p>
                  <p className="text-xs text-gold-700 mt-1">
                    Additional fees: M{booking.houseCallFee} (service) + M{booking.transportCost} (transport)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Provider Information */}
        <div className="glass border-2 border-pink-200 rounded-2xl p-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Building className="text-pink-500" size={24} />
            Provider Information
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-linear-to-br from-pink-50 to-pink-50 rounded-lg border-2 border-pink-200">
              <p className="font-bold text-lg text-gray-900">{provider.name}</p>
              <p className="text-sm text-gray-600">{provider.timezone}</p>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-cream-50 rounded-lg">
              <Mail className="text-pink-500 mt-0.5" size={20} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900 truncate">{provider.email}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-cream-50 rounded-lg">
              <Phone className="text-pink-500 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{provider.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Timeline */}
        <div className="glass border-2 border-pink-200 rounded-2xl p-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
            <DollarSign className="text-pink-500" size={24} />
            Pricing & Timeline
          </h2>
          
          {/* Pricing */}
          <div className="mb-6 p-4 bg-cream-50 border-2 border-pink-200 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service Price:</span>
              <span className="font-semibold text-gray-900">M{service.price}</span>
            </div>
            {booking.isHouseCall && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">House Call Fee:</span>
                  <span className="font-semibold text-gray-900">M{booking.houseCallFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Transport Cost:</span>
                  <span className="font-semibold text-gray-900">M{booking.transportCost}</span>
                </div>
              </>
            )}
            <div className="flex justify-between pt-2 border-t-2 border-pink-300">
              <span className="font-bold text-gray-900">Total Amount:</span>
              <span className="font-bold text-xl text-pink-600">M{totalPrice}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm">Timeline</h3>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-pink-500 mt-2" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Created</p>
                <p className="text-sm font-medium text-gray-700">
                  {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            
            {booking.providerActionAt && (
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${isAccepted ? 'bg-pink-500' : 'bg-gray-400'}`} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Action Taken</p>
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(booking.providerActionAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
            
            {isPending && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gold-500 mt-2" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Expires</p>
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(booking.expiresAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}