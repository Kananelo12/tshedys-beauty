'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  icon?: ReactNode;
}

export default function ServiceCard({ title, description, price, icon }: ServiceCardProps) {
  return (
    <motion.div 
      className="relative glass border-2 border-pink-200 rounded-3xl p-8 group cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ 
        y: -15, 
        scale: 1.03,
        rotateY: 5,
      }}
      transition={{ 
        duration: 0.4,
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Animated Background Gradient */}
      <motion.div 
        className="absolute inset-0 bg-linear-to-br from-pink-100 via-blush-50 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 glow-pink" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with Animation */}
        <motion.div 
          className="w-20 h-20 bg-linear-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-elevated"
          whileHover={{ 
            scale: 1.2, 
            rotate: 360,
            boxShadow: '0 0 30px rgba(255, 71, 179, 0.6)'
          }}
          transition={{ 
            type: "spring", 
            stiffness: 260,
            damping: 20
          }}
        >
          <div className="text-white">{icon || <Sparkles size={32} />}</div>
        </motion.div>

        {/* Service Title */}
        <h3 className="text-2xl font-serif font-bold bg-linear-to-r from-pink-700 to-purple-700 bg-clip-text text-transparent mb-3 group-hover:from-pink-600 group-hover:to-rose-600 transition-all">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-charcoal-600 text-base mb-6 leading-relaxed">{description}</p>

        {/* Sparkle Divider */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-pink-300 to-transparent" />
          <Sparkles className="text-pink-400 animate-sparkle" size={16} />
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-pink-300 to-transparent" />
        </div>

        {/* Price */}
        <div className="flex justify-start items-center">
          <div>
            <p className="text-xs text-charcoal-500 uppercase tracking-wider font-semibold mb-1">Starting From</p>
            <p className="text-2xl font-bold bg-linear-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">{price}</p>
          </div>
        </div>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-4 right-4 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white text-xl">→</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
