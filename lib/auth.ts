import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import clientPromise from './mongodb';
import { IProvider, ProviderWithoutPassword } from '@/models/Provider';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const COOKIE_NAME = 'admin_token';

export interface JWTPayload {
  providerId: string;
  email: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// Set auth cookie
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

// Clear auth cookie
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// Get auth token from cookie
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  return cookie?.value || null;
}

// Get current provider
export async function getCurrentProvider(): Promise<ProviderWithoutPassword | null> {
  try {
    const token = await getAuthToken();
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;

    const client = await clientPromise;
    const db = client.db('tshedybeauty');
    
    const provider = await db.collection<IProvider>('providers').findOne(
      { _id: new ObjectId(payload.providerId) },
      { projection: { password: 0 } }
    );

    return provider as ProviderWithoutPassword | null;
  } catch {
    return null;
  }
}

// Authenticate provider
export async function authenticateProvider(email: string, password: string): Promise<ProviderWithoutPassword | null> {
  try {
    const client = await clientPromise;
    const db = client.db('tshedybeauty');
    
    const provider = await db.collection<IProvider>('providers').findOne({ email });
    
    if (!provider) return null;

    const isValid = await verifyPassword(password, provider.password);
    if (!isValid) return null;

    // Return provider without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...providerWithoutPassword } = provider;
    return providerWithoutPassword as ProviderWithoutPassword;
  } catch {
    return null;
  }
}
