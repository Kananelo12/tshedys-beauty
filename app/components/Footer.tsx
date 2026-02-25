"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cream-100">
      {/* Main Footer */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 pt-20 pb-12">
        {/* Top — Centered Brand */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative w-14 h-14">
              <Image
                src="/logo.jpeg"
                alt="Tshedy Beauty"
                fill
                className="object-contain rounded-full"
              />
            </div>
          </div>
          <h3 className="text-2xl font-serif font-medium text-pink-500 mb-3">
            Tshedy&apos;s Beauty Parlour
          </h3>
          <p className="text-foreground/40 text-sm leading-relaxed max-w-sm mx-auto">
            Premium hair styling, braiding, and beauty services crafted with
            care in Maseru, Lesotho.
          </p>
        </div>

        {/* Middle — Links + Contact in row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 text-center md:text-left">
          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-pink-500 mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/#about" },
                { label: "Services", href: "/gallery" },
                { label: "Book Now", href: "/book" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/40 hover:text-pink-500 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-pink-500 mb-5">
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
                  <span className="text-sm text-foreground/40">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-pink-500 mb-5">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+26658809665"
                className="flex items-center gap-3 text-sm text-foreground/40 hover:text-pink-500 transition-colors duration-300 md:justify-start justify-center"
              >
                <Phone size={14} className="text-foreground/25 shrink-0" />
                +266 58809665
              </a>
              <a
                href="mailto:mamahlokomahloko818@gmail.com"
                className="flex items-center gap-3 text-sm text-foreground/40 hover:text-pink-500 transition-colors duration-300 md:justify-start justify-center"
              >
                <Mail size={14} className="text-foreground/25 shrink-0" />
                <span className="break-all">mamahlokomahloko818@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-foreground/40 md:justify-start justify-center">
                <MapPin size={14} className="text-foreground/25 shrink-0 mt-0.5" />
                <span>Room 4, Olympic Building, Maseru</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Icons — centered */}
        <div className="flex justify-center gap-3 mb-10">
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
              className="w-10 h-10 rounded-full border border-cream-300 flex items-center justify-center text-foreground/35 hover:text-pink-500 hover:border-pink-300 transition-all duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5">
          <p className="text-xs text-foreground/25 text-center">
            &copy; {new Date().getFullYear()} Tshedy&apos;s Beauty Parlour. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
