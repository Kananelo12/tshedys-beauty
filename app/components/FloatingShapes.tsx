'use client';

import { motion } from 'framer-motion';

export default function FloatingShapes() {
  const shapes = [
    { id: 1, type: 'circle', size: 100, x: '10%', y: '20%', delay: 0, duration: 8 },
    { id: 2, type: 'circle', size: 60, x: '80%', y: '10%', delay: 1, duration: 10 },
    { id: 3, type: 'circle', size: 80, x: '20%', y: '70%', delay: 0.5, duration: 9 },
    { id: 4, type: 'circle', size: 120, x: '85%', y: '60%', delay: 1.5, duration: 11 },
    { id: 5, type: 'circle', size: 90, x: '50%', y: '40%', delay: 2, duration: 7 },
    { id: 6, type: 'blob', size: 150, x: '70%', y: '80%', delay: 0.8, duration: 12 },
    { id: 7, type: 'blob', size: 110, x: '15%', y: '50%', delay: 1.2, duration: 10 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {shape.type === 'circle' ? (
            <div 
              className="w-full h-full rounded-full opacity-20 blur-2xl"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(255, 71, 179, 0.4) 0%, 
                  rgba(176, 92, 255, 0.3) 50%, 
                  rgba(247, 37, 133, 0.4) 100%)`
              }}
            />
          ) : (
            <div 
              className="w-full h-full opacity-20 blur-3xl"
              style={{
                background: `radial-gradient(ellipse at center, 
                  rgba(255, 106, 153, 0.5) 0%, 
                  rgba(255, 71, 179, 0.3) 50%, 
                  transparent 100%)`,
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
