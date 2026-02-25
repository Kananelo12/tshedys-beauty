"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/CHRISTMAS Lunch 23150P.png"
          alt="Tshedy Beauty"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content — centered like the screenshot */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 w-full pt-32 pb-20 text-center">
        {/* Script Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium text-white leading-none mb-6">
          Tshedy&apos;s Beauty
          <br />
          Parlour
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-10 max-w-xl mx-auto">
          Expert hair styling, braiding, and beauty treatments crafted with care
          to bring out your natural confidence.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-all duration-300 group"
          >
            Book Appointment
            <ArrowRight
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/25 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Explore Services
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-white/20" />
        <span className="text-white/30 text-[10px] tracking-widest uppercase">
          Scroll
        </span>
      </div>
    </section>
  );
}
