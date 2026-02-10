'use client';

import { Suspense, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Star, Crown, Wand2, Hand, Stars } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });

// Generate particle positions outside component (only once when module loads)
const particlePositions = Array.from({ length: 8 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
}));

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-linear-to-br from-pink-100 via-blush-50 to-purple-100">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left content */}
          <motion.div 
            className="w-full lg:w-6/12"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <div className="max-w-2xl">
              {/* Magical Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-pink-300"
              >
                <Sparkles className="w-4 h-4 text-pink-500 animate-pulse-glow" />
                <span className="text-sm font-semibold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                  <Sparkles size={16} className="text-pink-500" />
                  Fantasy Hair & Beauty Experience
                </span>
              </motion.div>

              {/* Main Heading with Gradient */}
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold leading-tight mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="bg-linear-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent text-glow">
                  Unleash Your
                </span>
                <br />
                <motion.span 
                  className="bg-linear-to-r from-rose-500 via-pink-500 to-blush-500 bg-clip-text text-transparent relative inline-block"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: 'linear' 
                  }}
                >
                  Magical Glow
                  <Star className="inline-block ml-3 text-pink-400 animate-sparkle" size={40} />
                </motion.span>
              </motion.h1>

              <motion.p 
                className="text-lg md:text-xl text-charcoal-700 mb-8 leading-relaxed font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Where fantasy meets beauty — experience enchanting hair styling, 
                mystical braids, and spellbinding treatments that transform you into royalty.
              </motion.p>

              {/* Animated Service Tags */}
              <motion.ul 
                className="flex flex-wrap gap-3 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {[
                  { name: 'Royal Styling', gradient: 'from-pink-400 to-rose-400', icon: Crown },
                  { name: 'Magical Braids', gradient: 'from-purple-400 to-pink-400', icon: Wand2 },
                  { name: 'Enchanted Nails', gradient: 'from-blush-400 to-pink-400', icon: Hand },
                  { name: 'Beauty Spells', gradient: 'from-rose-400 to-purple-400', icon: Stars },
                ].map((tag, i) => (
                  <motion.li 
                    key={tag.name}
                    className={`px-5 py-3 bg-linear-to-r ${tag.gradient} text-white rounded-full font-semibold text-sm shadow-elevated hover:shadow-elevated-hover transition-all cursor-pointer flex items-center gap-2`}
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      y: -5,
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.7 + i * 0.1,
                      type: 'spring',
                      stiffness: 300
                    }}
                  >
                    <tag.icon size={16} />
                    {tag.name}
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-5 items-start sm:items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Link href="/book" className="inline-block group">
                  <motion.span 
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-linear-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-lg shadow-pink-glow hover:shadow-pink-glow-lg transition-all duration-300 relative overflow-hidden"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Book Your Magic
                      <motion.span
                        animate={{ rotate: [0, 15, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowUpRight size={24} />
                      </motion.span>
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shimmer" />
                  </motion.span>
                </Link>

                <Link href="/services" className="inline-block group">
                  <motion.span 
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full border-3 border-pink-500 text-pink-600 font-bold text-lg hover:bg-pink-50 hover:shadow-lg transition-all duration-300 glass"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Services
                    <Sparkles className="ml-2 animate-sparkle" size={20} />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - 3D + Image */}
          <motion.div 
            className="w-full lg:w-6/12 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <div className="relative w-full max-w-2xl">
              {/* 3D Background Element */}
              <motion.div 
                className="absolute -top-10 -right-10 w-80 h-80 opacity-60 z-0"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                <Suspense fallback={<div className="w-full h-full bg-pink-200 rounded-full blur-3xl" />}>
                  <Hero3D />
                </Suspense>
              </motion.div>

              {/* Main Image */}
              <motion.div 
                className="relative group w-full aspect-4/5 rounded-3xl overflow-hidden shadow-elevated z-10"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: -2,
                }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-pink-600/30 via-transparent to-purple-600/20 z-10 mix-blend-overlay" />
                
                {/* Glow Border */}
                <div className="absolute inset-0 rounded-3xl border-4 border-pink-400/50 glow-pink z-20" />

                <Image
                  src="/CHRISTMAS Lunch 23150P.png"
                  alt="Enchanting beauty model with magical styling"
                  width={1080}
                  height={880}
                  sizes="(min-width: 1080px) 50vw, 100vw"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  priority
                />

                {/* Floating Particles on Hover */}
                {isHovered && (
                  <>
                    {particlePositions.map((pos, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-pink-400 rounded-full z-30"
                        initial={{ 
                          x: '50%', 
                          y: '50%',
                          scale: 0,
                        }}
                        animate={{
                          x: `${pos.x}%`,
                          y: `${pos.y}%`,
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>

              {/* Decorative Floating Elements */}
              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-linear-to-br from-pink-400 to-purple-400 rounded-full blur-2xl opacity-60 z-0"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
