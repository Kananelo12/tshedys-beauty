import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const result = await db.collection('services').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          description: description || '',
          price: parseFloat(price),
          duration: parseInt(duration),
          category,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db('tshedybeauty');

    const result = await db.collection('services').deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
