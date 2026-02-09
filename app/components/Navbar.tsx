'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Sparkles, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${
        scrolled 
          ? 'border-b-2 border-pink-200 shadow-elevated' 
          : 'border-b border-pink-100'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-12">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="relative w-12 h-12"
              >
                <Image 
                  src="/logo.png" 
                  alt="Tshedy Beauty Logo" 
                  fill
                  className="object-contain"
                />
              </motion.div>
              <motion.span 
                className="text-2xl font-serif font-bold bg-linear-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Tshedy Beauty
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/services', label: 'Services' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-sm font-semibold text-charcoal-700 hover:text-pink-600 transition-colors duration-200 relative group"
                >
                  {link.label}
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-pink-500 to-rose-500 group-hover:w-full transition-all duration-300"
                    whileHover={{ scaleX: 1 }}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Book Appointment Button */}
            <div className="hidden md:flex">
              <Link href="/book">
                <motion.span 
                  className="px-6 py-2.5 rounded-full bg-linear-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold shadow-pink-glow hover:shadow-pink-glow-lg transition-all duration-300 inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles size={16} className="animate-sparkle" />
                  Book Now
                </motion.span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-2 rounded-full bg-pink-100 text-pink-600"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="lg:hidden glass border-t-2 border-pink-200 mt-2 pb-6 rounded-b-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 pt-4 space-y-4">
                {[
                  { href: '/', label: 'Home', icon: '🏠' },
                  { href: '/about', label: 'About', icon: '💖' },
                  { href: '/services', label: 'Services', icon: '✨' },
                  { href: '/gallery', label: 'Gallery', icon: '🎨' },
                  { href: '/contact', label: 'Contact', icon: '📧' },
                ].map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href} 
                      className="flex items-center gap-3 py-3 px-4 rounded-xl bg-white/50 hover:bg-pink-100 text-charcoal-800 font-semibold transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-xl">{link.icon}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <Link 
                  href="/book" 
                  className="block w-full text-center py-3 rounded-full bg-linear-to-r from-pink-500 to-rose-500 text-white font-bold shadow-pink-glow"
                  onClick={() => setIsOpen(false)}
                >
                  ✨ Book Appointment
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
