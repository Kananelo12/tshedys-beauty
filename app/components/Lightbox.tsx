/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  alt?: string;
}

export default function Lightbox({ images, currentIndex, onClose, onNavigate, alt = 'Image' }: LightboxProps) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors group"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <X size={24} className="group-hover:text-pink-300 transition-colors" />
        </motion.button>

        {/* Image Counter */}
        <motion.div
          className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {currentIndex + 1} / {images.length}
        </motion.div>

        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <motion.button
            onClick={() => onNavigate(currentIndex - 1)}
            className="absolute left-4 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors group"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ChevronLeft size={32} className="group-hover:text-pink-300 transition-colors" />
          </motion.button>
        )}

        {currentIndex < images.length - 1 && (
          <motion.button
            onClick={() => onNavigate(currentIndex + 1)}
            className="absolute right-4 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors group"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ChevronRight size={32} className="group-hover:text-pink-300 transition-colors" />
          </motion.button>
        )}

        {/* Main Image */}
        <motion.div
          className="relative z-40 max-w-7xl max-h-[90vh] w-full h-full mx-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          key={currentIndex}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative max-w-full max-h-full">
              <img
                src={images[currentIndex]}
                alt={`${alt} ${currentIndex + 1}`}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                style={{ maxWidth: '100%', maxHeight: '90vh' }}
              />
              
              {/* Decorative Sparkles */}
              <motion.div
                className="absolute -top-4 -right-4 text-4xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 text-4xl"
                animate={{
                  rotate: [360, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                💖
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Hint Text */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Use arrow keys or click arrows to navigate • ESC to close
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
