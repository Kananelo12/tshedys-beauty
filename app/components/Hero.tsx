'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[84vh] lg:min-h-screen flex items-center pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left content */}
          <motion.div 
            className="w-full lg:w-6/12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-gray-900 leading-tight mb-6">
                Elevate Your Look with Premium Hair & Beauty
              </h1>

              <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                Expert styling, intricate braids, professional nail care, and
                tailored beauty treatments — delivered with calm, feminine
                luxury.
              </p>

              <motion.ul 
                className="flex flex-wrap gap-3 text-sm text-gray-600 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {['Hair Styling', 'Braiding', 'Nails', 'Beauty Treatments'].map((tag, i) => (
                  <motion.li 
                    key={tag}
                    className="px-3 py-1 bg-cream-100 rounded-full transition-colors hover:bg-sage-100 hover:text-sage-700"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                  >
                    {tag}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link href="/book" className="inline-block group">
                  <span className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-sage-600 text-sage-700 font-medium hover:bg-sage-50 hover:shadow-md transition-all duration-300">
                    <span>Book Appointment</span>
                    <span className="ml-3 inline-flex items-center justify-center bg-sage-600 text-white rounded-full w-8 h-8 group-hover:rotate-45 transition-transform duration-300">
                      <ArrowUpRight size={16} />
                    </span>
                  </span>
                </Link>

                <Link href="/services" className="inline-block">
                  <span className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 text-gray-800 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
                    View Services
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div 
            className="w-full lg:w-6/12 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative group max-w-md w-full lg:max-w-xl rounded-xl overflow-hidden shadow-soft-lg h-80 md:h-105 lg:h-160">
              <Image
                src="/CHRISTMAS Lunch 23150P.png"
                alt="Model with styled hair relaxing at the salon"
                width={1080}
                height={880}
                sizes="(min-width: 1080px) 50vw, 100vw"
                className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
