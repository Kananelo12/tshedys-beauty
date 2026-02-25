"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left — Text Content */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-32 pb-16 lg:pt-20 lg:pb-20 relative z-10">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-pink-500 mb-5">
            Hair &amp; Beauty Studio
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium text-foreground leading-[1.05] mb-6">
            Tshedy&apos;s Beauty
            <br />
            Parlour
          </h1>
          <p className="text-base sm:text-lg text-foreground/50 leading-relaxed mb-10 max-w-md">
            Expert hair styling, braiding, and beauty treatments crafted with
            care to bring out your natural confidence.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5">
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
              className="inline-flex items-center justify-center px-8 py-4 border border-foreground/15 text-foreground text-sm font-semibold rounded-full hover:bg-foreground/5 transition-all duration-300"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Right — Image */}
        <div className="relative top-20 h-[60vh] lg:h-auto lg:top-0">
          <Image
            src="/CHRISTMAS Lunch 23150P.png"
            alt="Tshedy Beauty"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain scale-110 lg:scale-125"
            priority
          />
        </div>
      </div>
    </section>
  );
}
