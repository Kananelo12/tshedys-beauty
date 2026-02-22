/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Lightbox from './Lightbox';

const galleryItems = [
  { label: 'Jumbo Braids', image: '/gallery/jumbo-braids.jpeg' },
  { label: 'Small Boho Braids', image: '/gallery/small-boho-braids.jpeg' },
  { label: 'French Curls', image: '/gallery/french-curls.jpeg' },
  { label: 'Short Curled Braids', image: '/gallery/short-curled-braids.jpeg' },
  // { label: 'Medium Curly Braids', image: '/gallery/medium-curly-braids.jpeg' },
  // { label: 'French Curls', image: '/gallery/french-curls2.jpeg' },
  // { label: 'Gel Hairstyle', image: '/gallery/gel-hairstyle.jpeg' },
  // { label: 'Bubble Braids', image: '/gallery/bubble-braids.jpeg' },
  // { label: 'Koroba Braids', image: '/gallery/koroba-braids.jpeg' },
  // { label: 'Extended Essence', image: '/gallery/extended-essence.jpeg' },
  // { label: 'Small Knotless Braids', image: '/gallery/small-knotless-braids.jpeg' },
  // { label: 'Mermaid Braids', image: '/gallery/mermaid-braids.jpeg' },
];

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-600 mb-3">
            Our Work
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Style Gallery
          </h2>
          <p className="text-base text-gray-500 max-w-lg mx-auto">
            Explore our signature looks — from bold braids to elegant curls
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="group relative aspect-3/4 rounded-xl overflow-hidden cursor-pointer bg-gray-100"
              onClick={() => openLightbox(i)}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-sm font-semibold">{item.label}</p>
                <Link
                  href="/book"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block mt-1.5 text-xs text-gold-400 hover:text-gold-300 font-medium transition-colors"
                >
                  Book this style →
                </Link>
              </div>
              {/* Always-visible label on mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-linear-to-t from-black/50 to-transparent sm:hidden">
                <p className="text-white text-xs font-medium">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors"
          >
            View Full Gallery
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={galleryItems.map(item => item.image)}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
          alt="Gallery image"
        />
      )}
    </section>
  );
}
