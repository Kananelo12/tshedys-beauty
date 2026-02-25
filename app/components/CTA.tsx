'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background image — matching the screenshot's image CTA section */}
      <div className="absolute inset-0">
        <Image
          src="/CHRISTMAS Lunch 23258ET.JPG"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] mb-6 text-white">
          Your Beauty Journey<br />
          Starts Here
        </h2>

        {/* Description */}
        <p className="text-white/55 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          Book your appointment today and experience personalized hair styling, 
          braiding, and beauty treatments crafted just for you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-all duration-300 group"
          >
            Book Appointment
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center px-8 py-4 border border-white/20 text-white/70 text-sm font-semibold rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto">
          {[
            { value: '100+', label: 'Happy Clients' },
            { value: '50+', label: 'Styles Done' },
            { value: '5.0', label: 'Rating' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-serif font-medium text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-white/35 font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
