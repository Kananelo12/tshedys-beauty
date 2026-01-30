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
    return <div className="p-4">Missing token</div>;
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
    return <div className="p-4">Service or provider not found</div>;
  }

  const { date, time } = fromUTC(booking.startDateTime);

  if (booking.status !== 'PENDING') {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
        <p><strong>Client:</strong> {booking.clientName}</p>
        <p><strong>Service:</strong> {service.name}</p>
        <p><strong>Date & Time:</strong> {date} at {time}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p>This booking has already been processed.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Confirm Booking</h1>
      <div className="mb-4">
        <p><strong>Client:</strong> {booking.clientName}</p>
        <p><strong>Service:</strong> {service.name}</p>
        <p><strong>Date & Time:</strong> {date} at {time}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        {booking.isHouseCall && (
          <p><strong>House Call:</strong> Yes (+M{booking.houseCallFee} + transport M{booking.transportCost})</p>
        )}
      </div>
      <div className="flex gap-4">
        <a
          href={`/api/bookings/${id}/confirm?token=${token}`}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          ✅ Accept Booking
        </a>
        <a
          href={`/api/bookings/${id}/reject?token=${token}`}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          ❌ Reject Booking
        </a>
      </div>
    </div>
  );
}