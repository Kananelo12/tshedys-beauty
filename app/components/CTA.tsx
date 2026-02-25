'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 sm:py-28 bg-black text-white relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center relative z-10">
        {/* Overline */}
        <p className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
          Ready to Transform?
        </p>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
          Your Beauty Journey
          <br />
          <span className="text-pink-400">Starts Here</span>
        </h2>

        {/* Description */}
        <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Book your appointment today and experience personalized hair styling, 
          braiding, and beauty treatments crafted just for you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-colors duration-200 group"
          >
            Book Appointment
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center px-8 py-3.5 border border-white/20 text-white/80 text-sm font-semibold rounded-full hover:bg-white/5 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto">
          {[
            { value: '100+', label: 'Happy Clients' },
            { value: '50+', label: 'Styles Done' },
            { value: '5.0', label: 'Rating' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gold-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-white/40 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
