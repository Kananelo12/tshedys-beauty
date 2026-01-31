import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('tshedybeauty');

    const services = await db.collection('services').find({}).toArray();

    return NextResponse.json({ services });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}