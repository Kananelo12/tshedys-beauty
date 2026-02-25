"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X, Menu, Instagram, Facebook, Phone, ShieldCheck } from "lucide-react";

export default function Navbar({ hasDarkHero = false }: { hasDarkHero?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // When not scrolled: use light text only if page has a dark hero behind the navbar
  // Otherwise default to dark text (readable on light backgrounds)
  const useLightText = !scrolled && hasDarkHero;

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

  const socialLinks = [
    { href: "https://www.instagram.com/tshedybeautyparlour", icon: Instagram, label: "Instagram" },
    { href: "https://www.facebook.com/tshedybeautyparlour", icon: Facebook, label: "Facebook" },
    { href: "tel:+26657995868", icon: Phone, label: "Phone" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : hasDarkHero
            ? "bg-transparent"
            : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Left — Social Icons + Logo */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-300 ${
                    useLightText
                      ? "text-white/50 hover:text-white"
                      : "text-foreground/40 hover:text-pink-500"
                  }`}
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
              <div className={`w-px h-4 mx-1 ${
                useLightText ? "bg-white/20" : "bg-foreground/10"
              }`} />
            </div>
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="relative w-9 h-9">
                <Image
                  src="/logo.jpeg"
                  alt="Tshedy Beauty Parlour Logo"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span className={`hidden sm:inline text-base font-serif font-medium transition-colors duration-300 ${
                useLightText ? "text-white" : "text-pink-500"
              }`}>Tshedy</span>
            </Link>
          </div>

          {/* Center / Right — Nav Items + Book Now */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                  useLightText
                    ? "text-white/70 hover:text-white"
                    : "text-foreground/60 hover:text-pink-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="px-6 py-2.5 bg-pink-500 text-white text-[13px] font-semibold rounded-full hover:bg-pink-600 transition-all duration-300"
            >
              Book Now
            </Link>
            <Link
              href="/admin/login"
              className={`p-2 rounded-full transition-colors duration-300 ${
                useLightText
                  ? "text-white/30 hover:text-white"
                  : "text-foreground/30 hover:text-pink-500"
              }`}
              aria-label="Admin Login"
              title="Admin Login"
            >
              <ShieldCheck size={18} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 transition-colors ${
              useLightText ? "text-white" : "text-foreground"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — full screen overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-white transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between h-20 px-5 sm:px-8 border-b border-cream-200">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/logo.jpeg" alt="Tshedy" fill className="object-contain rounded-full" />
            </div>
            <span className="text-lg font-serif font-medium text-pink-500">Tshedy</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="p-2 text-foreground" aria-label="Close">
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100vh-5rem)] px-8 pt-12 pb-10">
          <div className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-4 text-3xl font-serif font-medium text-foreground hover:text-pink-500 transition-colors border-b border-cream-200"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Icons — mobile */}
          <div className="flex items-center gap-4 mt-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/40 hover:text-pink-500 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            <Link
              href="/book"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-4 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition-colors"
            >
              Book Appointment
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 text-sm text-foreground/50 hover:text-foreground transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
