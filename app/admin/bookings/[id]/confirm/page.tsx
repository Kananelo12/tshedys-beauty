import { notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { fromUTC } from '@/lib/availability';
import {
  User,
  Scissors,
  CalendarDays,
  BarChart3,
  Home,
  CheckCircle,
  XCircle,
  ShieldAlert,
  AlertTriangle,
  ClipboardList,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function ConfirmBookingPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center p-4">
        <div className="bg-white border border-[#EEECEA] rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="text-red-500" size={28} />
          </div>
          <h1 className="text-xl font-serif font-medium text-foreground mb-1">Access Denied</h1>
          <p className="text-sm text-foreground/40">Missing authentication token.</p>
        </div>
      </div>
    );
  }

  const client = await clientPromise;
  const db = client.db('tshedybeauty');

  const booking = await db.collection('bookings').findOne({
    _id: new ObjectId(id),
    actionToken: token,
  });

  if (!booking) {
    notFound();
  }

  const service = await db.collection('services').findOne({ _id: new ObjectId(booking.serviceId) });
  const provider = await db.collection('providers').findOne({ _id: new ObjectId(booking.providerId) });

  if (!service || !provider) {
    return (
      <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center p-4">
        <div className="bg-white border border-[#EEECEA] rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="text-red-500" size={28} />
          </div>
          <h1 className="text-xl font-serif font-medium text-foreground mb-1">Error</h1>
          <p className="text-sm text-foreground/40">Service or provider not found.</p>
        </div>
      </div>
    );
  }

  const { date, time } = fromUTC(booking.startDateTime);

  if (booking.status !== 'PENDING') {
    const isAccepted = booking.status === 'ACCEPTED';
    return (
      <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center p-4">
        <div className="bg-white border border-[#EEECEA] rounded-2xl p-8 max-w-lg w-full">
          <div className="text-center mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isAccepted ? 'bg-emerald-50' : 'bg-[#F5F4F2]'
            }`}>
              {isAccepted
                ? <CheckCircle className="text-emerald-500" size={32} />
                : <XCircle className="text-foreground/30" size={32} />
              }
            </div>
            <h1 className="text-2xl font-serif font-medium text-foreground mb-1">
              Booking {isAccepted ? 'Accepted' : 'Rejected'}
            </h1>
            <p className="text-sm text-foreground/40">This booking has already been processed.</p>
          </div>

          <div className="bg-[#F5F4F2]/50 border border-[#EEECEA] rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <User className="text-foreground/25" size={16} />
              <div>
                <p className="text-[11px] text-foreground/30">Client</p>
                <p className="text-sm font-medium text-foreground">{booking.clientName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Scissors className="text-foreground/25" size={16} />
              <div>
                <p className="text-[11px] text-foreground/30">Service</p>
                <p className="text-sm font-medium text-foreground">{service.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays className="text-foreground/25" size={16} />
              <div>
                <p className="text-[11px] text-foreground/30">Date & Time</p>
                <p className="text-sm font-medium text-foreground">{date} at {time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BarChart3 className="text-foreground/25" size={16} />
              <div>
                <p className="text-[11px] text-foreground/30">Status</p>
                <span className={`inline-flex px-2.5 py-1 text-[11px] font-semibold rounded-full ${
                  isAccepted ? 'bg-emerald-50 text-emerald-600' : 'bg-[#F5F4F2] text-foreground/40'
                }`}>
                  {booking.status.toLowerCase()}
                </span>
              </div>
            </div>
            {booking.isHouseCall && (
              <div className="flex items-center gap-3">
                <Home className="text-foreground/25" size={16} />
                <div>
                  <p className="text-[11px] text-foreground/30">House Call</p>
                  <p className="text-sm font-medium text-foreground">Yes (+M{booking.houseCallFee} + transport M{booking.transportCost})</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center p-4">
      <div className="bg-white border border-[#EEECEA] rounded-2xl p-8 max-w-lg w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#F5F4F2] flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="text-foreground/40" size={28} />
          </div>
          <h1 className="text-2xl font-serif font-medium text-foreground mb-1">Review Booking Request</h1>
          <p className="text-sm text-foreground/40">Please review the details and take action.</p>
        </div>

        <div className="bg-[#F5F4F2]/50 border border-[#EEECEA] rounded-xl p-5 space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <User className="text-foreground/25" size={16} />
            <div>
              <p className="text-[11px] text-foreground/30">Client</p>
              <p className="text-sm font-medium text-foreground">{booking.clientName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Scissors className="text-foreground/25" size={16} />
            <div>
              <p className="text-[11px] text-foreground/30">Service</p>
              <p className="text-sm font-medium text-foreground">{service.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CalendarDays className="text-foreground/25" size={16} />
            <div>
              <p className="text-[11px] text-foreground/30">Date & Time</p>
              <p className="text-sm font-medium text-foreground">{date} at {time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BarChart3 className="text-foreground/25" size={16} />
            <div>
              <p className="text-[11px] text-foreground/30">Status</p>
              <span className="inline-flex px-2.5 py-1 text-[11px] font-semibold rounded-full bg-amber-50 text-amber-600">
                {booking.status.toLowerCase()}
              </span>
            </div>
          </div>
          {booking.isHouseCall && (
            <div className="flex items-center gap-3">
              <Home className="text-foreground/25" size={16} />
              <div>
                <p className="text-[11px] text-foreground/30">House Call</p>
                <p className="text-sm font-medium text-foreground">Yes (+M{booking.houseCallFee} + transport M{booking.transportCost})</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <a
            href={`/api/bookings/${id}/confirm?token=${token}`}
            className="flex-1 bg-foreground hover:bg-foreground/90 text-white px-5 py-3 rounded-xl font-medium transition-colors text-center flex items-center justify-center gap-2 text-sm"
          >
            <CheckCircle size={16} />
            Accept Booking
          </a>
          <a
            href={`/api/bookings/${id}/reject?token=${token}`}
            className="flex-1 bg-[#F5F4F2] hover:bg-[#EEECEA] text-foreground/60 px-5 py-3 rounded-xl font-medium transition-colors text-center flex items-center justify-center gap-2 text-sm"
          >
            <XCircle size={16} />
            Reject Booking
          </a>
        </div>
      </div>
    </div>
  );
}