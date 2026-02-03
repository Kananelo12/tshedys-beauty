"use client";

import { useState } from 'react';

export default function AdminGalleryPage() {
  const [images] = useState([
    '/CHRISTMAS Lunch 23189CC.JPG', '/CHRISTMAS Lunch 23208CV.JPG', '/CHRISTMAS Lunch 232136B.JPG',
    '/CHRISTMAS Lunch 23218DF.JPG', '/CHRISTMAS Lunch 23219DG.JPG', '/CHRISTMAS Lunch 23221DI.JPG',
    '/CHRISTMAS Lunch 23225DM.JPG', '/CHRISTMAS Lunch 23226DN.JPG'
  ]);

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
