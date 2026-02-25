import { notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { fromUTC } from '@/lib/availability';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function ConfirmBookingPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-serif font-medium text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">Missing authentication token.</p>
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
      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-serif font-medium text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600">Service or provider not found.</p>
        </div>
      </div>
    );
  }

  const { date, time } = fromUTC(booking.startDateTime);

  if (booking.status !== 'PENDING') {
    const isAccepted = booking.status === 'ACCEPTED';
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
          <div className="text-center mb-6">
            <div className={`text-6xl mb-4 ${isAccepted ? 'text-green-500' : 'text-red-500'}`}>
              {isAccepted ? '✅' : '❌'}
            </div>
            <h1 className="text-3xl font-serif font-medium text-gray-900 mb-2">
              Booking {isAccepted ? 'Accepted' : 'Rejected'}
            </h1>
            <p className="text-gray-600">This booking has already been processed.</p>
          </div>

          <div className="bg-cream-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-pink-500 text-xl">👤</div>
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <p className="font-medium text-gray-900">{booking.clientName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-pink-500 text-xl">💇‍♀️</div>
              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-medium text-gray-900">{service.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-pink-500 text-xl">📅</div>
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium text-gray-900">{date} at {time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-pink-500 text-xl">📊</div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                  isAccepted ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {booking.status.toLowerCase()}
                </span>
              </div>
            </div>
            {booking.isHouseCall && (
              <div className="flex items-center gap-3">
                <div className="text-pink-500 text-xl">🏠</div>
                <div>
                  <p className="text-sm text-gray-500">House Call</p>
                  <p className="font-medium text-gray-900">Yes (+M{booking.houseCallFee} + transport M{booking.transportCost})</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
        <div className="text-center mb-6">
          <div className="text-pink-500 text-6xl mb-4">📋</div>
          <h1 className="text-3xl font-serif font-medium text-gray-900 mb-2">Review Booking Request</h1>
          <p className="text-gray-600">Please review the details and take action.</p>
        </div>

        <div className="bg-cream-50 rounded-lg p-6 space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="text-pink-500 text-xl">👤</div>
            <div>
              <p className="text-sm text-gray-500">Client</p>
              <p className="font-medium text-gray-900">{booking.clientName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-pink-500 text-xl">💇‍♀️</div>
            <div>
              <p className="text-sm text-gray-500">Service</p>
              <p className="font-medium text-gray-900">{service.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-pink-500 text-xl">📅</div>
            <div>
              <p className="text-sm text-gray-500">Date & Time</p>
              <p className="font-medium text-gray-900">{date} at {time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-pink-500 text-xl">📊</div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-gold-100 text-gold-700">
                {booking.status.toLowerCase()}
              </span>
            </div>
          </div>
          {booking.isHouseCall && (
            <div className="flex items-center gap-3">
              <div className="text-pink-500 text-xl">🏠</div>
              <div>
                <p className="text-sm text-gray-500">House Call</p>
                <p className="font-medium text-gray-900">Yes (+M{booking.houseCallFee} + transport M{booking.transportCost})</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <a
            href={`/api/bookings/${id}/confirm?token=${token}`}
            className="flex-1 bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors text-center flex items-center justify-center gap-2"
          >
            ✅ Accept Booking
          </a>
          <a
            href={`/api/bookings/${id}/reject?token=${token}`}
            className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors text-center flex items-center justify-center gap-2"
          >
            ❌ Reject Booking
          </a>
        </div>
      </div>
    </div>
  );
}