import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await params;
    const client = await clientPromise;
    const db = client.db('tshedybeauty');

    const booking = await db.collection('bookings').findOne({
      actionToken: token,
      expiresAt: { $gt: new Date() }
    });

    if (!booking) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 404 });
    }

    // Get service and provider
    const service = await db.collection('services').findOne({ _id: booking.serviceId });
    const provider = await db.collection('providers').findOne({ _id: booking.providerId });

    return NextResponse.json({
      booking: {
        ...booking,
        service,
        provider,
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}