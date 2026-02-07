'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-lg overflow-hidden group">
              <Image src="/CHRISTMAS Lunch 23185BY.JPG" alt="styling" width={600} height={440} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="rounded-lg overflow-hidden group">
              <Image src="/CHRISTMAS Lunch 23171BK.JPG" alt="treatment" width={600} height={440} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="rounded-lg overflow-hidden col-span-2 group">
              <Image src="/CHRISTMAS Lunch 23222DJ.JPG" alt="relax" width={1200} height={440} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-serif font-semibold text-gray-900 mb-4">25+ Years of Expertise in Beauty</h2>
            <p className="text-gray-600 mb-6">We combine refined technique and premium products to deliver beautiful, long-lasting results. Our stylists and therapists focus on personalised care in a calm, welcoming environment.</p>
            <p className="text-gray-700 mb-6">From contemporary cuts to traditional braiding and advanced nail artistry, we take care of every detail to ensure you leave feeling confident.</p>
            <Link href="/book" className="inline-flex items-center px-6 py-3 rounded-full border-2 border-sage-600 text-sage-700 hover:bg-sage-50 hover:shadow-md transition-all duration-300">Appointment Now</Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
