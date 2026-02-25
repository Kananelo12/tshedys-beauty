"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  ExternalLink,
} from "lucide-react";

interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    // Fetch current provider
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setProvider(data.provider);
        }
      })
      .catch(console.error);
  }, []);

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
    }
  };

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Services", href: "/admin/services", icon: Sparkles },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-65 transform bg-white border-r border-[#EEECEA] transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#EEECEA]">
          <Link
            href="/admin"
            className="text-lg font-serif font-medium text-foreground"
          >
            Tshedy Admin
          </Link>
          <button
            className="lg:hidden text-foreground/40 hover:text-foreground/70"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="p-3 mt-2 space-y-0.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-foreground text-white font-semibold"
                    : "text-foreground/50 hover:bg-[#F5F4F2] hover:text-foreground"
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
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#EEECEA]">
          {provider && (
            <div className="mb-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-foreground rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {getInitials(provider.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {provider.name}
                  </p>
                  <p className="text-xs text-foreground/35 truncate">
                    {provider.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F5F4F2] hover:bg-[#EEECEA] rounded-xl text-sm font-medium text-foreground/60 hover:text-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut size={15} />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>

          <Link
            href="/"
            className="mt-2 block w-full text-center px-4 py-2 hover:bg-[#F5F4F2] rounded-xl text-sm text-foreground/35 hover:text-foreground/60 transition-all items-center justify-center gap-1.5"
          >
            <ExternalLink size={13} />
            View Site
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="lg:pl-65">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 bg-white/80 backdrop-blur-xl border-b border-[#EEECEA] px-5">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-foreground/50 hover:text-foreground"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-base font-medium text-foreground">
                Admin Portal
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {provider && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F5F4F2] rounded-full">
                <User size={13} className="text-foreground/40" />
                <span className="text-sm font-medium text-foreground/60">
                  {provider.name}
                </span>
              </div>
            )}
          </div>
        </header>

        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
