'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export default function Card({ children, className = '', hover = false, gradient = false }: CardProps) {
  const baseClasses = gradient 
    ? 'glass border-2 border-pink-200 rounded-3xl shadow-elevated'
    : 'bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-pink-200 shadow-elevated';

  if (hover) {
    return (
      <motion.div 
        className={`${baseClasses} ${className}`}
        whileHover={{ 
          y: -8, 
          scale: 1.02,
          boxShadow: '0 20px 60px rgba(255, 71, 179, 0.3), 0 8px 24px rgba(247, 37, 133, 0.25)'
        }}
        transition={{ 
          duration: 0.3,
          type: 'spring',
          stiffness: 260,
          damping: 20
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}
