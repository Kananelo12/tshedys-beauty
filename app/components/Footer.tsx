"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-linear-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative w-12 h-12">
                <Image 
                  src="/logo.png" 
                  alt="Tshedy Beauty Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold bg-linear-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                Tshedy Beauty
              </h3>
            </motion.div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Where fantasy meets beauty. Luxury hair & beauty services crafted
              with magic to transform you into royalty.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="https://www.instagram.com/tshedys_beauty_parlour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-pink-500/20 hover:bg-pink-500 border border-pink-500/30 flex items-center justify-center transition-all group"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram
                  size={18}
                  className="text-pink-300 group-hover:text-white transition-colors"
                />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/profile.php?id=61581650923087"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-pink-500/20 hover:bg-pink-500 border border-pink-500/30 flex items-center justify-center transition-all group"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook
                  size={18}
                  className="text-pink-300 group-hover:text-white transition-colors"
                />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@tshedysbeautyparlour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-pink-500/20 hover:bg-pink-500 border border-pink-500/30 flex items-center justify-center transition-all group"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-4 h-4 text-pink-300 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-lg font-bold text-pink-300 mb-4 flex items-center gap-2">
              ✨ Magical Services
            </h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              {[
                "Hair Styling",
                "Braiding & Extensions",
                "Nails & Manicure",
                "Beauty Treatments",
                "Bridal Services",
              ].map((service, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href="/services"
                    className="hover:text-pink-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all" />
                    {service}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
              🔗 Quick Links
            </h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              {[
                "Home",
                "About Us",
                "Gallery",
                "Book Appointment",
                "Contact",
              ].map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="hover:text-purple-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all" />
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-rose-300 mb-4 flex items-center gap-2">
              💌 Stay Connected
            </h4>
            <div className="space-y-3 text-gray-300 text-sm mb-6">
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-pink-400" />
                <a
                  href="tel:+26658809665"
                  className="hover:text-pink-400 transition-colors"
                >
                  +266 58809665
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-purple-400" />
                <a
                  href="mailto:mamahlokomahloko818@gmail.com"
                  className="hover:text-purple-400 transition-colors text-xs"
                >
                  mamahlokomahloko818@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-rose-400" />
                Room 4, Olympic Building, Maseru
              </p>
            </div>

            <div>
              <p className="text-gray-300 text-sm mb-3">
                Get magical updates & exclusive offers
              </p>
              <form className="flex gap-2">
                <input
                  aria-label="Email"
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-full bg-charcoal-700 text-white placeholder-gray-400 border border-pink-500/30 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
                />
                <motion.button
                  type="submit"
                  className="px-6 py-2 bg-linear-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold hover:shadow-pink-glow transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700/50 text-center">
          {/* <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            Made with{" "}
            <Heart size={16} className="text-pink-500 animate-pulse-glow" /> by
            Tshedy&apos;s Team
          </p> */}
          <p className="text-xs text-gray-500 mt-2">
            © {new Date().getFullYear()} Tshedy&apos;s Beauty Parlour. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
