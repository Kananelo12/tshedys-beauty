'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-10">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-serif font-semibold text-gray-900">GlowHaven</span>
            </Link>

            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/" className="text-sm text-gray-700 hover:text-sage-600">Home</Link>
              <Link href="/about" className="text-sm text-gray-700 hover:text-sage-600">About</Link>
              <Link href="/services" className="text-sm text-gray-700 hover:text-sage-600">Services</Link>
              <Link href="/gallery" className="text-sm text-gray-700 hover:text-sage-600">Gallery</Link>
              <Link href="/contact" className="text-sm text-gray-700 hover:text-sage-600">Contact</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="hidden md:inline-flex p-2 rounded-full hover:bg-gray-100">
              <Search size={18} />
            </button>
            <button aria-label="Cart" className="hidden md:inline-flex p-2 rounded-full hover:bg-gray-100">
              <ShoppingCart size={18} />
            </button>

            <div className="hidden md:flex">
              <Link href="/book" className="px-5 py-2 rounded-full border-2 border-sage-600 text-sage-700 hover:bg-sage-50 font-medium">Book Appointment</Link>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-md">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 mt-2 pb-4">
            <div className="px-4 space-y-3">
              <Link href="/" className="block py-2 text-gray-700">Home</Link>
              <Link href="/about" className="block py-2 text-gray-700">About</Link>
              <Link href="/services" className="block py-2 text-gray-700">Services</Link>
              <Link href="/gallery" className="block py-2 text-gray-700">Gallery</Link>
              <Link href="/contact" className="block py-2 text-gray-700">Contact</Link>
              <Link href="/book" className="block w-full text-center mt-2 py-2 rounded-full border-2 border-sage-600 text-sage-700">Book Appointment</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
