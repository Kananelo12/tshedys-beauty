import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { randomUUID } from 'crypto';
import { addMinutes } from 'date-fns';
import { toUTC } from '@/lib/availability';
import { sendBookingNotification } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Booking request body:', body);
    const { serviceId, clientName, clientEmail, clientPhone, date, time, isHouseCall } = body;

    if (!serviceId || !clientName || !clientEmail || !clientPhone || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('tshedybeauty');

    // Get service
    const service = await db.collection('services').findOne({ _id: new ObjectId(serviceId) });
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Get provider (assume one)
    const provider = await db.collection('providers').findOne({});
    if (!provider) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
    }

    const startDateTime = toUTC(date, time);
    const endDateTime = addMinutes(startDateTime, service.duration);

    // Check for conflicts
    const conflict = await db.collection('bookings').findOne({
      providerId: provider._id,
      status: { $in: ['ACCEPTED', 'PENDING'] },
      $or: [
        { startDateTime: { $lt: endDateTime }, endDateTime: { $gt: startDateTime } }
      ]
    });

    if (conflict) {
      return NextResponse.json({ error: 'Time slot not available' }, { status: 409 });
    }

    // Create booking
    const booking = {
      providerId: provider._id.toString(),
      serviceId,
      clientName,
      clientEmail,
      clientPhone,
      startDateTime,
      endDateTime,
      status: 'PENDING',
      isHouseCall: !!isHouseCall,
      houseCallFee: isHouseCall ? 100 : 0,
      transportCost: isHouseCall ? 50 : 0, // configurable
      createdAt: new Date(),
      expiresAt: addMinutes(new Date(), 30), // 30 min hold
      actionToken: randomUUID(),
    };

    const result = await db.collection('bookings').insertOne(booking);
    console.log('Booking created:', result.insertedId);

    // Send notifications
    await sendBookingNotification(booking, service, provider);

    return NextResponse.json({ bookingId: result.insertedId, message: 'Booking created, awaiting confirmation' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}