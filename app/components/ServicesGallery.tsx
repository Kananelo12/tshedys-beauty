/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Lightbox from './Lightbox';

const galleryItems = [
  { label: 'Jumbo Braids', price: 150, image: '/gallery/jumbo-braids.jpeg' },
  { label: 'Small Boho Braids', price: 300, image: '/gallery/small-boho-braids.jpeg' },
  { label: 'French Curls', price: 200, image: '/gallery/french-curls.jpeg' },
  { label: 'Short Curled Braids', price: 280, image: '/gallery/short-curled-braids.jpeg' },
];

export default function ServicesGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-pink-500 mb-4">
              Our Work
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-foreground">
              See Our Services
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors group shrink-0"
          >
            View all work
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Gallery Grid — masonry-style with varying heights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-cream-200 ${
                i === 0 ? 'aspect-[3/4]' : i === 1 ? 'aspect-square' : i === 2 ? 'aspect-square' : 'aspect-[3/4]'
              }`}
              onClick={() => openLightbox(i)}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white text-sm font-medium">{item.label}</p>
                <p className="text-white/60 text-xs font-medium">M{item.price}</p>
                <Link
                  href={`/book?style=${encodeURIComponent(item.label)}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block mt-1 text-xs text-white/70 hover:text-white font-medium transition-colors"
                >
                  Book this style →
                </Link>
              </div>
              {/* Always-visible label on mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/50 to-transparent sm:hidden">
                <p className="text-white text-xs font-medium">{item.label}</p>
                <p className="text-white/50 text-[10px] font-medium">M{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={galleryItems.map(item => item.image)}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
          alt="Service Gallery image"
        />
      )}
    </section>
  );
}
