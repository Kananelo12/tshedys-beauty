import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { getCurrentProvider, hashPassword } from '@/lib/auth';
import { IProvider } from '@/models/Provider';

// GET /api/providers/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const current = await getCurrentProvider();
    if (!current) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid provider ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('tshedybeauty');

    const provider = await db
      .collection<IProvider>('providers')
      .findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });

    if (!provider) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
    }

    return NextResponse.json({
      _id: provider._id!.toString(),
      name: provider.name,
      email: provider.email,
      phone: provider.phone,
      timezone: provider.timezone,
      createdAt: provider.createdAt,
      updatedAt: provider.updatedAt,
    });
  } catch (error) {
    console.error('Get provider error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/providers/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const current = await getCurrentProvider();
    if (!current) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid provider ID' }, { status: 400 });
    }

    const body = await request.json();
    const { name, email, phone, timezone, password } = body;

    const client = await clientPromise;
    const db = client.db('tshedybeauty');
    const collection = db.collection<IProvider>('providers');

    // Check provider exists
    const existing = await collection.findOne({ _id: new ObjectId(id) });
    if (!existing) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
    }

    // Check for duplicate email (if changing email)
    if (email && email !== existing.email) {
      const duplicate = await collection.findOne({ email });
      if (duplicate) {
        return NextResponse.json(
          { error: 'A provider with this email already exists' },
          { status: 409 }
        );
      }
    }

    // Build update object
    const updateFields: Record<string, unknown> = { updatedAt: new Date() };
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone !== undefined) updateFields.phone = phone;
    if (timezone) updateFields.timezone = timezone;
    if (password) updateFields.password = await hashPassword(password);

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    const updated = await collection.findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );

    return NextResponse.json({
      _id: updated!._id!.toString(),
      name: updated!.name,
      email: updated!.email,
      phone: updated!.phone,
      timezone: updated!.timezone,
      createdAt: updated!.createdAt,
      updatedAt: updated!.updatedAt,
    });
  } catch (error) {
    console.error('Update provider error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/providers/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const current = await getCurrentProvider();
    if (!current) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid provider ID' }, { status: 400 });
    }

    // Prevent self-deletion
    if (current._id.toString() === id) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 403 }
      );
    }

    const client = await clientPromise;
    const db = client.db('tshedybeauty');

    const result = await db
      .collection<IProvider>('providers')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete provider error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
