'use client';

import { motion } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  repeatDelay: number;
}

// Generate sparkles once when module loads
const sparkles: Sparkle[] = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 3,
  duration: Math.random() * 2 + 2,
  repeatDelay: Math.random() * 2,
}));

export default function SparkleEffect() {

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-linear-to-br from-blush-300 via-lilac-300 to-peach-300 blur-[1px]"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -30, -60],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: sparkle.repeatDelay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
