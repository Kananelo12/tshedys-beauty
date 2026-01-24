import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[84vh] lg:min-h-screen flex items-center pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left content */}
          <div className="w-full lg:w-6/12">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-gray-900 leading-tight mb-6">
                Elevate Your Look with Premium Hair & Beauty
              </h1>

              <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                Expert styling, intricate braids, professional nail care, and
                tailored beauty treatments — delivered with calm, feminine
                luxury.
              </p>

              <ul className="flex flex-wrap gap-3 text-sm text-gray-600 mb-8">
                <li className="px-3 py-1 bg-cream-100 rounded-full">
                  Hair Styling
                </li>
                <li className="px-3 py-1 bg-cream-100 rounded-full">
                  Braiding
                </li>
                <li className="px-3 py-1 bg-cream-100 rounded-full">Nails</li>
                <li className="px-3 py-1 bg-cream-100 rounded-full">
                  Beauty Treatments
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link href="/book" className="inline-block">
                  <span className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-sage-600 text-sage-700 font-medium hover:bg-sage-50 transition">
                    <span>Book Appointment</span>
                    <span className="ml-3 inline-flex items-center justify-center bg-sage-600 text-white rounded-full w-8 h-8">
                      <ArrowUpRight size={16} />
                    </span>
                  </span>
                </Link>

                <Link href="/services" className="inline-block">
                  <span className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 text-gray-800 font-medium hover:bg-gray-50 transition">
                    View Services
                  </span>
                </Link>
              </div>

              {/* <div className="mt-8 text-sm text-gray-600 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-sage-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.9 ★ — Trusted Stylists</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-sage-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Book online • Flexible hours</span>
                </div>
              </div> */}
            </div>
          </div>

          {/* Right image */}
          <div className="w-full lg:w-6/12 flex justify-center lg:justify-end">
            <div className="relative group max-w-md w-full lg:max-w-xl rounded-xl overflow-hidden shadow-soft-lg h-80 md:h-105 lg:h-160">
              <Image
                src="/hero.webp"
                alt="Model with styled hair relaxing at the salon"
                width={1080}
                height={880}
                sizes="(min-width: 1080px) 50vw, 100vw"
                className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
