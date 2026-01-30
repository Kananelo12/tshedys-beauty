import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { sendClientNotification } from '@/lib/notifications';

async function handleConfirm(id: string, token: string) {
  const client = await clientPromise;
  const db = client.db('tshedybeauty');

  const booking = await db.collection('bookings').findOne({
    _id: new ObjectId(id),
    actionToken: token,
    status: 'PENDING',
    expiresAt: { $gt: new Date() }
  });

  if (!booking) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 404 });
  }

  // Update status
  await db.collection('bookings').updateOne(
    { _id: booking._id },
    { $set: { status: 'ACCEPTED', providerActionAt: new Date() } }
  );

  // Get service for notification
  const service = await db.collection('services').findOne({ _id: new ObjectId(booking.serviceId) });

  await sendClientNotification(booking, service, 'confirmed');

  return NextResponse.redirect(`${process.env.BASE_URL}/admin/bookings/success`);
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  return handleConfirm(id, token);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  return handleConfirm(id, token);
}