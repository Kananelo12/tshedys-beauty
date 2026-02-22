"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, Sparkles, Image as ImageIcon, Settings, LogOut, Menu, X, User } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    // Fetch current provider
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setProvider(data.provider);
        }
      })
      .catch(console.error);
  }, []);

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      setLoggingOut(false);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
    { name: 'Services', href: '/admin/services', icon: Sparkles },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-gray-200 shadow-lg transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <Link
            href="/"
            className="text-xl font-serif font-bold text-gray-900"
          >
            Tshedy
          </Link>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-pink-500 text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-pink-600'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          {provider && (
            <div className="mb-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {getInitials(provider.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {provider.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {provider.email}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut size={15} />
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
          
          <Link
            href="/"
            className="mt-2 block w-full text-center px-4 py-2 bg-white hover:bg-pink-50 rounded-lg text-sm text-gray-600 hover:text-pink-600 transition-colors border border-gray-200"
          >
            View Site
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-pink-600 hover:text-pink-700"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-lg font-serif font-bold text-gray-900">
                Admin Portal
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {provider && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                <User size={14} className="text-pink-500" />
                <span className="text-sm font-medium text-gray-700">
                  {provider.name}
                </span>
              </div>
            )}
          </div>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
