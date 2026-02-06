'use client';

import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 relative overflow-hidden group';
  
  const variants = {
    primary: 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white hover:shadow-pink-glow hover:scale-105 active:scale-95',
    secondary: 'bg-gradient-to-r from-blush-400 to-pink-400 text-white hover:shadow-elevated hover:scale-105 active:scale-95',
    outline: 'bg-transparent text-pink-600 border-2 border-pink-500 hover:bg-pink-50 hover:border-pink-600 hover:shadow-lg',
    gradient: 'bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white hover:shadow-pink-glow-lg hover:scale-105 active:scale-95 animate-shimmer',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shimmer" />
    </motion.button>
  );
}
