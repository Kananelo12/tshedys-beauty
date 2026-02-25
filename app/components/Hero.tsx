'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end pb-16 pt-10 overflow-hidden bg-cream-100">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-banner.png"
          alt="Tshedy Beauty"
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Overline */}
          <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            Premium Beauty Studio — Maseru
          </p>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.05] mb-5">
            Where Beauty
            <br />
            <span className="text-pink-300">Meets Grace</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8 max-w-lg">
            Expert hair styling, braiding, and beauty treatments, crafted with 
            care to bring out your natural confidence.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-pink-500 text-white text-base font-semibold rounded-full hover:bg-pink-600 transition-colors duration-200 group"
            >
              Book Appointment
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/#services"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white text-base font-semibold rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
