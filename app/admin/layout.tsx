"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Bookings', href: '/admin/bookings', icon: '📅' },
    { name: 'Services', href: '/admin/services', icon: '✨' },
    { name: 'Gallery', href: '/admin/gallery', icon: '🖼️' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-cream-50 text-gray-800">
      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-gray-200 shadow-sm transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
          <Link href="/" className="text-2xl font-serif font-medium text-gray-900">
            Tshedy
          </Link>
          <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            ✕
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
                  isActive ? 'bg-sage-600 text-white font-semibold' : 'text-gray-700 hover:bg-cream-50 hover:text-sage-600'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center text-white font-semibold">A</div>
            <div className="flex-1">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">admin@tshedys.com</p>
            </div>
          </div>
          <Link href="/" className="mt-3 block w-full text-center px-4 py-2 bg-cream-100 rounded-md text-sm text-gray-700 hover:text-sage-600">
            View Site
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 bg-white px-4 shadow-sm border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-sage-600" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">☰</button>
            <h1 className="text-xl font-serif font-medium text-gray-900">Admin</h1>
            <div className="hidden sm:block text-sm text-gray-500">Manage bookings, services, and content</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input aria-label="Search" placeholder="Search bookings, clients..." className="w-64 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-200" />
            </div>
            <button className="rounded-full bg-cream-50 px-3 py-2 text-sm hover:bg-cream-100">New Booking</button>
            <div className="w-10 h-10 rounded-full bg-sage-600 flex items-center justify-center text-white">A</div>
          </div>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
