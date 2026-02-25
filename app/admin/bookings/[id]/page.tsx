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
        <div className="bg-white border border-red-200 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">&#x2716;</div>
          <h1 className="text-xl font-serif font-medium text-foreground mb-1">Error</h1>
          <p className="text-sm text-foreground/40">Service or provider not found.</p>
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
        className="inline-flex items-center gap-2 text-foreground/40 hover:text-foreground text-sm font-medium transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Bookings
      </Link>

      {/* Header Card */}
      <div className="bg-white border border-[#EEECEA] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-serif font-medium text-foreground tracking-[-0.025em]">
              Booking Details
            </h1>
            <p className="text-xs text-foreground/25 mt-1">ID: {booking._id.toString()}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-full self-start ${
            isAccepted ? 'bg-emerald-50 text-emerald-600' :
            isRejected ? 'bg-[#F5F4F2] text-foreground/40' :
            'bg-amber-50 text-amber-600'
          }`}>
            {isAccepted && <CheckCircle size={13} />}
            {isPending && <Clock size={13} />}
            {isRejected && <XCircle size={13} />}
            {booking.status}
          </span>
        </div>

        {/* Quick Actions for Pending */}
        {isPending && (
          <div className="flex flex-wrap gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex-1 flex items-center gap-3">
              <AlertCircle className="text-amber-500" size={20} />
              <div>
                <p className="text-sm font-semibold text-amber-700">Action Required</p>
                <p className="text-xs text-amber-600">This booking is awaiting your response</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={`/api/bookings/${id}/confirm?token=${booking.actionToken}`}
                className="flex items-center gap-1.5 px-4 py-2 bg-foreground hover:bg-foreground/90 text-white text-sm font-medium rounded-lg transition-all"
              >
                <CheckCircle size={15} />
                Accept
              </a>
              <a
                href={`/api/bookings/${id}/reject?token=${booking.actionToken}`}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#F5F4F2] hover:bg-[#EEECEA] text-foreground/60 text-sm font-medium rounded-lg transition-all"
              >
                <XCircle size={15} />
                Reject
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Client Information */}
        <div className="bg-white border border-[#EEECEA] rounded-2xl p-6">
          <h2 className="text-xs font-semibold text-foreground/35 uppercase tracking-wider mb-5 flex items-center gap-1.5">
            <User size={13} />
            Client Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[#F5F4F2]/50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-white text-sm font-bold">
                {booking.clientName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-foreground/30">Full Name</p>
                <p className="text-sm font-medium text-foreground">{booking.clientName}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-[#F5F4F2]/50 rounded-xl">
              <Mail className="text-foreground/25 mt-0.5" size={15} />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-foreground/30">Email Address</p>
                <p className="text-sm font-medium text-foreground truncate">{booking.clientEmail}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-[#F5F4F2]/50 rounded-xl">
              <Phone className="text-foreground/25 mt-0.5" size={15} />
              <div className="flex-1">
                <p className="text-[11px] text-foreground/30">Phone Number</p>
                <p className="text-sm font-medium text-foreground">{booking.clientPhone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white border border-[#EEECEA] rounded-2xl p-6">
          <h2 className="text-xs font-semibold text-foreground/35 uppercase tracking-wider mb-5 flex items-center gap-1.5">
            <Calendar size={13} />
            Service Details
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-foreground rounded-xl">
              <p className="text-[11px] text-white/40 mb-0.5">Service</p>
              <p className="font-medium text-white">{service.name}</p>
              {service.category && (
                <span className="inline-block mt-1.5 px-2 py-0.5 bg-white/10 text-[11px] font-medium text-white/70 rounded-full">
                  {service.category}
                </span>
              )}
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-[#F5F4F2]/50 rounded-xl">
              <Calendar className="text-foreground/25 mt-0.5" size={15} />
              <div className="flex-1">
                <p className="text-[11px] text-foreground/30">Date</p>
                <p className="text-sm font-medium text-foreground">{date}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-[#F5F4F2]/50 rounded-xl">
              <Clock className="text-foreground/25 mt-0.5" size={15} />
              <div className="flex-1">
                <p className="text-[11px] text-foreground/30">Time</p>
                <p className="text-sm font-medium text-foreground">{time} - {endTime}</p>
                <p className="text-[11px] text-foreground/25 mt-0.5">{service.duration} minutes</p>
              </div>
            </div>
            
            {booking.isHouseCall && (
              <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <Home className="text-amber-500 mt-0.5" size={15} />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-amber-700">House Call Service</p>
                  <p className="text-[11px] text-amber-600 mt-0.5">
                    Additional fees: M{booking.houseCallFee} (service) + M{booking.transportCost} (transport)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Provider Information */}
        <div className="bg-white border border-[#EEECEA] rounded-2xl p-6">
          <h2 className="text-xs font-semibold text-foreground/35 uppercase tracking-wider mb-5 flex items-center gap-1.5">
            <Building size={13} />
            Provider Information
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-[#F5F4F2]/50 rounded-xl">
              <p className="text-sm font-medium text-foreground">{provider.name}</p>
              <p className="text-xs text-foreground/35">{provider.timezone}</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-[#F5F4F2]/50 rounded-xl">
              <Mail className="text-foreground/25 mt-0.5" size={15} />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-foreground/30">Email</p>
                <p className="text-sm font-medium text-foreground truncate">{provider.email}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-[#F5F4F2]/50 rounded-xl">
              <Phone className="text-foreground/25 mt-0.5" size={15} />
              <div className="flex-1">
                <p className="text-[11px] text-foreground/30">Phone</p>
                <p className="text-sm font-medium text-foreground">{provider.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Timeline */}
        <div className="bg-white border border-[#EEECEA] rounded-2xl p-6">
          <h2 className="text-xs font-semibold text-foreground/35 uppercase tracking-wider mb-5 flex items-center gap-1.5">
            <DollarSign size={13} />
            Pricing & Timeline
          </h2>
          
          {/* Pricing */}
          <div className="mb-6 p-3 bg-[#F5F4F2]/50 border border-[#EEECEA] rounded-xl space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/40">Service Price:</span>
              <span className="font-medium text-foreground">M{service.price}</span>
            </div>
            {booking.isHouseCall && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/40">House Call Fee:</span>
                  <span className="font-medium text-foreground">M{booking.houseCallFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/40">Transport Cost:</span>
                  <span className="font-medium text-foreground">M{booking.transportCost}</span>
                </div>
              </>
            )}
            <div className="flex justify-between pt-2 border-t border-[#EEECEA]">
              <span className="font-semibold text-foreground">Total Amount:</span>
              <span className="font-bold text-lg text-foreground">M{totalPrice}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-foreground/35 uppercase tracking-wider">Timeline</h3>
            
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2" />
              <div className="flex-1">
                <p className="text-[11px] text-foreground/30">Created</p>
                <p className="text-sm font-medium text-foreground/60">
                  {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            
            {booking.providerActionAt && (
              <div className="flex items-start gap-3">
                <div className={`w-1.5 h-1.5 rounded-full mt-2 ${isAccepted ? 'bg-emerald-500' : 'bg-foreground/20'}`} />
                <div className="flex-1">
                  <p className="text-[11px] text-foreground/30">Action Taken</p>
                  <p className="text-sm font-medium text-foreground/60">
                    {new Date(booking.providerActionAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
            
            {isPending && (
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2" />
                <div className="flex-1">
                  <p className="text-[11px] text-foreground/30">Expires</p>
                  <p className="text-sm font-medium text-foreground/60">
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