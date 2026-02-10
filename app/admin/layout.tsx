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
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-blush-50 to-purple-50">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform glass-dark border-r-2 border-pink-200 shadow-elevated transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b-2 border-pink-200">
          <Link
            href="/"
            className="text-2xl font-serif font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
          >
            Tshedy
          </Link>
          <button
            className="lg:hidden text-charcoal-500 hover:text-charcoal-700"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'bg-linear-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-pink-glow'
                    : 'text-charcoal-700 hover:bg-white/60 hover:text-pink-600'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-pink-200 bg-white/40">
          {provider && (
            <div className="mb-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-linear-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {getInitials(provider.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-charcoal-800 truncate">
                    {provider.name}
                  </p>
                  <p className="text-xs text-charcoal-600 truncate">
                    {provider.email}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 rounded-xl text-sm font-medium text-charcoal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut size={16} />
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
          
          <Link
            href="/"
            className="mt-2 block w-full text-center px-4 py-2 bg-white hover:bg-pink-50 rounded-xl text-sm text-charcoal-700 hover:text-pink-600 transition-all border border-pink-200"
          >
            View Site
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 glass border-b-2 border-pink-200 px-4 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-pink-600 hover:text-pink-700"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-xl font-serif font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Admin Portal
              </h1>
              <p className="hidden sm:block text-sm text-charcoal-600">
                Manage your beauty empire
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {provider && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white rounded-full border-2 border-pink-200">
                <User size={16} className="text-pink-600" />
                <span className="text-sm font-medium text-charcoal-700">
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
