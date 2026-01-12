'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal-950/95 backdrop-blur-sm border-b border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl md:text-3xl font-script font-bold text-gold-500 gold-glow">
              Tshedy&apos;s Beauty Parlour
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-gold-500 transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/services" 
              className="text-gray-300 hover:text-gold-500 transition-colors duration-200"
            >
              Services
            </Link>
            <Link 
              href="/gallery" 
              className="text-gray-300 hover:text-gold-500 transition-colors duration-200"
            >
              Gallery
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-300 hover:text-gold-500 transition-colors duration-200"
            >
              Contact
            </Link>
            <Link 
              href="/book" 
              className="px-6 py-2.5 bg-gold-500 text-charcoal-950 font-semibold rounded-full hover:bg-gold-400 hover:shadow-gold-glow transition-all duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gold-500 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link 
              href="/" 
              className="block text-gray-300 hover:text-gold-500 transition-colors duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/services" 
              className="block text-gray-300 hover:text-gold-500 transition-colors duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/gallery" 
              className="block text-gray-300 hover:text-gold-500 transition-colors duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
            <Link 
              href="/contact" 
              className="block text-gray-300 hover:text-gold-500 transition-colors duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/book" 
              className="block w-full px-6 py-2.5 bg-gold-500 text-charcoal-950 font-semibold rounded-full hover:bg-gold-400 text-center mt-4"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
