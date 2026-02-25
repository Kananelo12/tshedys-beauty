"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X, Menu, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#services", label: "Services" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black ${
        scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.3)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.jpeg"
                alt="Tshedy Beauty Parlour Logo"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <span className="text-lg font-serif font-semibold tracking-wide text-gold-500">
              Tshedy Beauty Parlour
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium tracking-[0.08em] uppercase text-white/70 hover:text-gold-400 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="text-[13px] font-medium tracking-wide text-gold-500 hover:text-gold-400 transition-colors px-4 py-2"
            >
              Admin
            </Link>
            <Link
              href="/book"
              className="px-6 py-2.5 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-colors duration-200"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-gold-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-18 bg-black z-40 transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full px-6 pt-8 pb-10">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-4 border-b border-white/10 text-white/90 hover:text-gold-400 transition-colors"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="text-[15px] font-medium tracking-wide">
                  {link.label}
                </span>
                <ChevronRight size={16} className="text-white/30" />
              </Link>
            ))}
            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-4 border-b border-white/10 text-gold-500 hover:text-gold-400 transition-colors"
            >
              <span className="text-[15px] font-medium tracking-wide">
                Admin
              </span>
              <ChevronRight size={16} className="text-gold-500/40" />
            </Link>
          </div>

          <div className="mt-auto">
            <Link
              href="/book"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-4 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition-colors"
            >
              Book Appointment
            </Link>
            <p className="text-center text-white/30 text-xs mt-4">
              +266 58809665
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
