import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getAvailableSlots } from '@/lib/availability';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const serviceId = searchParams.get('serviceId');

    if (!date || !serviceId) {
      return NextResponse.json({ error: 'Missing date or serviceId' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('tshedybeauty');

    // Get service duration
    const service = await db.collection('services').findOne({ _id: new ObjectId(serviceId) });
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Get existing bookings for the date
    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay = new Date(`${date}T23:59:59.999Z`);
    const bookings = await db.collection('bookings').find({
      startDateTime: { $gte: startOfDay, $lt: endOfDay },
      status: { $in: ['confirmed', 'pending'] }
    }).toArray();

    const slots = getAvailableSlots(date, service.duration, bookings);

    return NextResponse.json({ slots });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}