/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  alt?: string;
}

export default function Lightbox({ images, currentIndex, onClose, onNavigate, alt = 'Image' }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 bg-white/10 rounded-full text-white text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous */}
      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="absolute left-3 z-50 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Next */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          className="absolute right-3 z-50 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Image */}
      <div className="relative z-40 max-w-7xl max-h-[90vh] w-full h-full mx-4 flex items-center justify-center" onClick={onClose}>
        <img
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 bg-white/10 rounded-full text-white/60 text-xs">
        Arrow keys to navigate · ESC to close
      </div>
    </div>
  );
}
