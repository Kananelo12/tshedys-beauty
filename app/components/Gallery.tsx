/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Lightbox from './Lightbox';

export default function Gallery() {
  const allImages = [
    '/CHRISTMAS Lunch 23144J.JPG','/CHRISTMAS Lunch 23155U.JPG','/CHRISTMAS Lunch 23177BQ.JPG',
    '/CHRISTMAS Lunch 23229DQ.JPG','/CHRISTMAS Lunch 23248EJ.JPG','/CHRISTMAS Lunch 23270FF.JPG',
    '/CHRISTMAS Lunch 23136B.JPG','/CHRISTMAS Lunch 23137C.JPG','/CHRISTMAS Lunch 23138D.JPG',
    '/CHRISTMAS Lunch 23150P.JPG','/CHRISTMAS Lunch 23151Q.JPG','/CHRISTMAS Lunch 23169BI.JPG'
  ];
  
  // Split into two rows
  const row1 = allImages.slice(0, 6);
  const row2 = allImages.slice(6, 12);
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Gallery</h2>
          <p className="text-lg text-gray-600">Beautiful transformations from our salon</p>
        </div>

        {/* Row 1 - Horizontal Scroll */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
            {row1.map((src, i) => (
              <div 
                key={i} 
                className="shrink-0 w-72 h-80 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md"
                onClick={() => openLightbox(i)}
              >
                <img 
                  src={src} 
                  alt={`Gallery ${i + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Horizontal Scroll */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
            {row2.map((src, i) => (
              <div 
                key={i} 
                className="shrink-0 w-72 h-80 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md"
                onClick={() => openLightbox(i + 6)}
              >
                <img 
                  src={src} 
                  alt={`Gallery ${i + 7}`} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={allImages}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
          alt="Gallery image"
        />
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
