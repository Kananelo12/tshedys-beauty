import { notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { fromUTC } from '@/lib/availability';
import { generateStatusWhatsApp } from '@/lib/notifications';
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
  const db = client.db('tshedybeautyparlour');

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

  // Generate WhatsApp link for processed bookings
  const whatsappLink = (isAccepted || isRejected)
    ? generateStatusWhatsApp(booking, service, isAccepted ? 'confirmed' : 'rejected')
    : null;

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

        {whatsappLink && (
          <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <div className="flex-1 flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <div>
                <p className="font-semibold text-gray-800">WhatsApp Notification</p>
                <p className="text-sm text-gray-600">Send {booking.clientName.split(' ')[0]} a WhatsApp about this booking</p>
              </div>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-medium rounded-lg hover:shadow-lg transition-all text-sm"
            >
              Send WhatsApp
            </a>
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