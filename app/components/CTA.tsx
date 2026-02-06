'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-pink-200 via-purple-200 to-rose-200">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 71, 179, 0.4) 2px, transparent 2px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 bg-pink-400 rounded-full blur-3xl opacity-40"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl opacity-40"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        {/* Top Icon */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <Star className="text-pink-500 animate-sparkle" size={48} />
            <Sparkles className="absolute -top-2 -right-2 text-purple-500 animate-pulse-glow" size={24} />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h3 
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-linear-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
            Magical Beauty Treatments
          </span>
          <br />
          <span className="text-charcoal-800">For Your Body & Soul</span>
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-lg md:text-xl text-charcoal-700 mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Transform yourself with our enchanting services. Experience luxury, 
          magic, and the royal treatment you deserve.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/book">
            <motion.span 
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-linear-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-lg shadow-pink-glow-lg relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="animate-sparkle" size={20} />
              Book Your Magic Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shimmer" />
            </motion.span>
          </Link>

          <Link href="/services">
            <motion.span 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-3 border-purple-500 text-purple-700 font-bold text-lg hover:bg-purple-50 hover:shadow-lg transition-all glass"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Services
            </motion.span>
          </Link>
        </motion.div>

        {/* Stats or Features */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { icon: '👑', value: '500+', label: 'Happy Queens' },
            { icon: '✨', value: '1000+', label: 'Magical Transformations' },
            { icon: '💖', value: '5★', label: 'Customer Rating' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-6 border-2 border-pink-200"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-charcoal-600 font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
