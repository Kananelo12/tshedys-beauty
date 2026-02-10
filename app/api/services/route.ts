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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, duration, category } = body;

    if (!name?.trim() || price === undefined || price === null || price === '' || 
        duration === undefined || duration === null || duration === '' || !category?.trim()) {
      return NextResponse.json(
        { error: 'Name, price, duration, and category are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('tshedybeauty');

    const result = await db.collection('services').insertOne({
      name,
      description: description || '',
      price: parseFloat(price),
      duration: parseInt(duration),
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      serviceId: result.insertedId,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}