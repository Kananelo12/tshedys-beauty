"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-16 h-16">
                <Image 
                  src="/logo.jpeg" 
                  alt="Tshedy Beauty Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <h3 
                className="text-2xl font-serif font-bold"
                style={{ color: '#F59E0B' }}
              >
                Tshedy Beauty
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Luxury hair & beauty services crafted with care to bring out your natural beauty.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/tshedys_beauty_parlour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gold-500 flex items-center justify-center transition-all group"
              >
                <Instagram
                  size={18}
                  className="text-gold-500 group-hover:text-black transition-colors"
                />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61581650923087"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gold-500 flex items-center justify-center transition-all group"
              >
                <Facebook
                  size={18}
                  className="text-gold-500 group-hover:text-black transition-colors"
                />
              </a>
              <a
                href="https://www.tiktok.com/@tshedysbeautyparlour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gold-500 flex items-center justify-center transition-all group"
              >
                <svg
                  className="w-4 h-4 text-gold-500 group-hover:text-black transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Services
            </h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              {[
                "Hair Styling",
                "Braiding & Extensions",
                "Nails & Manicure",
                "Beauty Treatments",
                "Bridal Services",
              ].map((service, i) => (
                <li key={i}>
                  <Link
                    href="/#services"
                    className="hover:text-gold-500 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Quick Links
            </h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/#about" },
                { label: "Gallery", href: "/#gallery" },
                { label: "Book Appointment", href: "/book" },
                { label: "Contact", href: "/#contact" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="hover:text-gold-500 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Contact Us
            </h4>
            <div className="space-y-3 text-gray-300 text-sm mb-6">
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-gold-500" />
                <a
                  href="tel:+26658809665"
                  className="hover:text-gold-500 transition-colors"
                >
                  +266 58809665
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-gold-500" />
                <a
                  href="mailto:mamahlokomahloko818@gmail.com"
                  className="hover:text-gold-500 transition-colors text-xs"
                >
                  mamahlokomahloko818@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-gold-500" />
                Room 4, Olympic Building, Maseru
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Tshedy&apos;s Beauty Parlour. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
