'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-20 bg-cover bg-center relative overflow-hidden" style={{ backgroundColor: '#f3eae3' }}>
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: 'radial-gradient(circle, #8b9474 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.h3 
          className="text-3xl font-serif font-semibold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          All kinds of hair & beauty treatments for your body & soul
        </motion.h3>
        <motion.p 
          className="text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Pamper your body and refresh with our curated beauty services.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/book" className="inline-flex items-center px-6 py-3 rounded-full bg-sage-600 text-white hover:bg-sage-700 hover:shadow-lg transition-all duration-300">Appointment Now</Link>
        </motion.div>
      </div>
    </section>
  );
}
