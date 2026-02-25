import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getCurrentProvider, hashPassword } from '@/lib/auth';
import { IProvider } from '@/models/Provider';

// GET /api/providers — list all providers (without passwords)
export async function GET() {
  try {
    const current = await getCurrentProvider();
    if (!current) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('tshedybeauty');

    const providers = await db
      .collection<IProvider>('providers')
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      providers.map((p) => ({
        _id: p._id!.toString(),
        name: p.name,
        email: p.email,
        phone: p.phone,
        timezone: p.timezone,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }))
    );
  } catch (error) {
    console.error('List providers error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/providers — create a new provider
export async function POST(request: NextRequest) {
  try {
    const current = await getCurrentProvider();
    if (!current) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, phone, timezone, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('tshedybeauty');

    // Check for duplicate email
    const existing = await db.collection<IProvider>('providers').findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'A provider with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);

    const now = new Date();
    const result = await db.collection<IProvider>('providers').insertOne({
      name,
      email,
      phone: phone || '',
      timezone: timezone || 'Africa/Maseru',
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    } as IProvider);

    return NextResponse.json(
      {
        _id: result.insertedId.toString(),
        name,
        email,
        phone: phone || '',
        timezone: timezone || 'Africa/Maseru',
        createdAt: now,
        updatedAt: now,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create provider error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
