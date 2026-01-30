import { notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { fromUTC } from '@/lib/availability';

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
  const isAccepted = booking.status === 'ACCEPTED';
  const isRejected = booking.status === 'REJECTED';
  const isPending = booking.status === 'PENDING';

  return (
    <div className="min-h-screen bg-cream-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <a
            href="/admin/bookings"
            className="text-sage-600 hover:text-sage-700 font-medium flex items-center gap-2"
          >
            ← Back to Bookings
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-serif font-medium text-gray-900 mb-2">Booking Details</h1>
              <p className="text-gray-600">ID: {booking._id.toString()}</p>
            </div>
            <span className={`inline-flex px-4 py-2 text-sm font-medium rounded-full ${
              isAccepted ? 'bg-green-100 text-green-700' :
              isRejected ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {booking.status.toLowerCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-cream-50 rounded-lg p-6">
                <h2 className="text-xl font-serif font-medium text-gray-900 mb-4">Client Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="text-sage-600 text-xl">👤</div>
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium text-gray-900">{booking.clientName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sage-600 text-xl">📧</div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{booking.clientEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sage-600 text-xl">📱</div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{booking.clientPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cream-50 rounded-lg p-6">
                <h2 className="text-xl font-serif font-medium text-gray-900 mb-4">Service Details</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="text-sage-600 text-xl">💇‍♀️</div>
                    <div>
                      <p className="text-sm text-gray-500">Service</p>
                      <p className="font-medium text-gray-900">{service.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sage-600 text-xl">📅</div>
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium text-gray-900">{date} at {time}</p>
                    </div>
                  </div>
                  {booking.isHouseCall && (
                    <div className="flex items-center gap-3">
                      <div className="text-sage-600 text-xl">🏠</div>
                      <div>
                        <p className="text-sm text-gray-500">House Call</p>
                        <p className="font-medium text-gray-900">Yes (+M{booking.houseCallFee} + transport M{booking.transportCost})</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-cream-50 rounded-lg p-6">
                <h2 className="text-xl font-serif font-medium text-gray-900 mb-4">Provider Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="text-sage-600 text-xl">👩‍💼</div>
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium text-gray-900">{provider.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sage-600 text-xl">📧</div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{provider.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sage-600 text-xl">📱</div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{provider.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cream-50 rounded-lg p-6">
                <h2 className="text-xl font-serif font-medium text-gray-900 mb-4">Booking Timeline</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="text-sage-600 text-xl">🕒</div>
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-medium text-gray-900">{new Date(booking.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sage-600 text-xl">⏰</div>
                    <div>
                      <p className="text-sm text-gray-500">Expires</p>
                      <p className="font-medium text-gray-900">{new Date(booking.expiresAt).toLocaleString()}</p>
                    </div>
                  </div>
                  {booking.providerActionAt && (
                    <div className="flex items-center gap-3">
                      <div className="text-sage-600 text-xl">✅</div>
                      <div>
                        <p className="text-sm text-gray-500">Action Taken</p>
                        <p className="font-medium text-gray-900">{new Date(booking.providerActionAt).toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {isPending && (
            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-yellow-600 text-xl">⚠️</div>
                <h3 className="text-lg font-medium text-yellow-800">Pending Action Required</h3>
              </div>
              <p className="text-yellow-700 mb-4">
                This booking is still pending confirmation. The provider needs to review and accept or reject it.
              </p>
              <a
                href={`/admin/bookings/${id}/confirm?token=${booking.actionToken}`}
                className="inline-flex items-center gap-2 bg-sage-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-sage-700 transition-colors"
              >
                Review Booking
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}