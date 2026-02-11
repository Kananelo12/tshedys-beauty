"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X, Menu, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-black z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-20 h-20 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.jpeg"
                  alt="Tshedy Beauty Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span 
                className="text-2xl font-serif font-bold transition-colors duration-300"
                style={{ color: '#F59E0B' }}
              >
                Tshedy Beauty
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {[
              { href: "/", label: "Home" },
              { href: "/#about", label: "About" },
              { href: "/#services", label: "Services" },
              { href: "/#gallery", label: "Gallery" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-white hover:text-gold-500 transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Buttons - Right */}
          <div className="flex items-center space-x-3">
            {/* Admin Button */}
            <div className="hidden md:flex">
              <Link href="/admin/login">
                <button className="px-4 py-2.5 rounded-full bg-gold-500 text-white font-semibold hover:bg-gold-600 cursor-pointer transition-all duration-300 inline-flex items-center gap-2">
                  <Lock size={16} />
                  Admin
                </button>
              </Link>
            </div>

            {/* Book Appointment Button */}
            <div className="hidden md:flex">
              <Link href="/book">
                <button className="px-6 py-2.5 rounded-full bg-pink-500 text-white font-bold hover:bg-pink-600 hover:shadow-pink-md cursor-pointer transition-all duration-300">
                  Book Now
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full bg-gray-800 text-gold-500 hover:bg-gray-700 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden bg-gray-900 mt-2 pb-6 rounded-b-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 pt-4 space-y-4">
                {[
                  { href: "/", label: "Home" },
                  { href: "/#about", label: "About" },
                  { href: "/#services", label: "Services" },
                  { href: "/#gallery", label: "Gallery" },
                  { href: "/admin/login", label: "Admin", isAdmin: true },
                ].map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition-all ${
                        "isAdmin" in link && link.isAdmin
                          ? "bg-gold-500 text-black hover:bg-gold-600"
                          : "bg-gray-800 hover:bg-gray-700 text-white"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {"isAdmin" in link && link.isAdmin && <Lock size={20} />}
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <Link
                  href="/book"
                  className="flex items-center justify-center gap-2 w-full text-center py-3 rounded-full bg-pink-500 text-white font-bold hover:bg-pink-600 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
