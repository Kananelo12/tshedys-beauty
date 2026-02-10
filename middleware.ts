import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if this is an admin route (but not the login page)
  const isAdminRoute = path.startsWith('/admin') && path !== '/admin/login';

  if (isAdminRoute) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      console.log('[Middleware] No token found, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      console.log('[Middleware] Token verified:', payload);
      return NextResponse.next();
    } catch (error) {
      // Invalid token, redirect to login
      console.log('[Middleware] Token verification failed:', error);
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // If on login page and authenticated, redirect to dashboard
  if (path === '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;
    
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        console.log('[Middleware] Already authenticated, redirecting to dashboard');
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch {
        // Invalid token, stay on login page
        console.log('[Middleware] Invalid token on login page, clearing');
        const response = NextResponse.next();
        response.cookies.delete('admin_token');
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
