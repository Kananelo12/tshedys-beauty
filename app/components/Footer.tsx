"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.jpeg"
                  alt="Tshedy Beauty"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span className="text-lg font-serif font-semibold text-gold-500">
                Tshedy Beauty
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Premium hair styling, braiding, and beauty services crafted with
              care in Maseru, Lesotho.
            </p>
            <div className="flex gap-3">
              {[
                {
                  href: "https://www.instagram.com/tshedys_beauty_parlour",
                  icon: <Instagram size={16} />,
                  label: "Instagram",
                },
                {
                  href: "https://www.facebook.com/profile.php?id=61581650923087",
                  icon: <Facebook size={16} />,
                  label: "Facebook",
                },
                {
                  href: "https://www.tiktok.com/@tshedysbeautyparlour",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                    </svg>
                  ),
                  label: "TikTok",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gold-500/80 hover:text-gold-400 hover:border-gold-500/40 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-[0.12em] uppercase text-gold-500 mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/#about" },
                { label: "Services", href: "/#services" },
                { label: "Gallery", href: "/#gallery" },
                { label: "Book Now", href: "/book" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-[0.12em] uppercase text-gold-500 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Knotless Braids",
                "French Curls",
                "Twist Braids",
                "Bridal Makeup",
                "Lash Extensions",
              ].map((service) => (
                <li key={service}>
                  <span className="text-sm text-white/40">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-[0.12em] uppercase text-gold-500 mb-5">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+26658809665"
                className="flex items-center gap-3 text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                <Phone size={14} className="text-gold-500/60 shrink-0" />
                +266 58809665
              </a>
              <a
                href="mailto:mamahlokomahloko818@gmail.com"
                className="flex items-center gap-3 text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                <Mail size={14} className="text-gold-500/60 shrink-0" />
                <span className="break-all">mamahlokomahloko818@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-white/50">
                <MapPin size={14} className="text-gold-500/60 shrink-0 mt-0.5" />
                <span>Room 4, Olympic Building, Maseru</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-5">
          <p className="text-xs text-white/25 text-center">
            &copy; {new Date().getFullYear()} Tshedy&apos;s Beauty Parlour. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
