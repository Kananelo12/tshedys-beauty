"use client";

import { useState } from 'react';

export default function AdminGalleryPage() {
  const [images] = useState(Array.from({ length: 8 }).map((_, i) => `/hero.webp`));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-medium text-gray-900">Gallery</h2>
        <div className="flex items-center gap-2">
          <input type="file" className="hidden" id="upload" />
          <label htmlFor="upload" className="px-4 py-2 rounded-full bg-sage-600 text-white cursor-pointer">Upload</label>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((src, idx) => (
            <div key={idx} className="rounded-md overflow-hidden bg-cream-50">
              <img src={src} alt={`gallery-${idx}`} className="w-full h-40 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
