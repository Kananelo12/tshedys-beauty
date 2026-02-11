'use client';

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center pt-24 pb-12 bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="max-w-2xl mx-auto lg:mx-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white mb-6 border border-pink-200 shadow-sm">
                <span className="text-sm font-semibold text-pink-600">
                  Premium Beauty Services
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6 text-gray-900">
                Unleash Your
                <br />
                <span className="text-pink-500">Natural Beauty</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Experience professional hair styling, braiding, and beauty treatments 
                that bring out your confidence and natural glow.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                <Link href="/book" className="inline-block">
                  <button className="px-8 py-4 rounded-full bg-pink-500 text-white font-bold text-lg hover:bg-pink-600 transition-colors duration-300 shadow-md">
                    Book Appointment
                  </button>
                </Link>

                <Link href="/#services" className="inline-block">
                  <button className="px-8 py-4 rounded-full border-2 border-pink-500 text-pink-600 font-bold text-lg hover:bg-pink-50 transition-colors duration-300">
                    View Services
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-lg lg:max-w-2xl top-12">
              <div className="relative w-full h-150 sm:h-175 lg:h-200">
                <Image
                  src="/CHRISTMAS Lunch 23150P.png"
                  alt="Professional beauty styling"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
