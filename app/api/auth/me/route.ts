import { NextResponse } from 'next/server';
import { getCurrentProvider } from '@/lib/auth';

export async function GET() {
  try {
    const provider = await getCurrentProvider();

    if (!provider) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      provider: {
        id: provider._id.toString(),
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        timezone: provider.timezone,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
