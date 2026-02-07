'use client';

import { motion } from 'framer-motion';

export default function FlowingHairStrand({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      viewBox="0 0 200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M100 0C100 0 80 100 90 200C100 300 110 350 100 400"
        stroke="url(#hairGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: [0, 0.3, 0.2, 0.3],
        }}
        transition={{
          pathLength: { duration: 2, ease: "easeInOut" },
          opacity: { duration: 3, repeat: Infinity, repeatType: "reverse" },
        }}
      />
      <motion.path
        d="M100 0C100 0 120 100 110 200C100 300 90 350 100 400"
        stroke="url(#hairGradient2)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: [0, 0.2, 0.15, 0.2],
        }}
        transition={{
          pathLength: { duration: 2.5, ease: "easeInOut", delay: 0.3 },
          opacity: { duration: 4, repeat: Infinity, repeatType: "reverse", delay: 0.5 },
        }}
      />
      <defs>
        <linearGradient id="hairGradient" x1="100" y1="0" x2="100" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B94" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#B472FF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFC233" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="hairGradient2" x1="100" y1="0" x2="100" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C895FF" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#FF8A4D" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#EE7762" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
