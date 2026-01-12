'use client';

import { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';

export default function GalleryManagement() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Hairstyles', 'Braiding', 'Coloring', 'Natural Hair', 'Special Events'];

  const images = [
    { id: 1, category: 'Hairstyles', title: 'Elegant Updo', uploaded: '2026-01-10' },
    { id: 2, category: 'Braiding', title: 'Box Braids', uploaded: '2026-01-10' },
    { id: 3, category: 'Coloring', title: 'Balayage', uploaded: '2026-01-09' },
    { id: 4, category: 'Natural Hair', title: 'Twist Out', uploaded: '2026-01-09' },
    { id: 5, category: 'Special Events', title: 'Bridal Style', uploaded: '2026-01-08' },
    { id: 6, category: 'Hairstyles', title: 'Bob Cut', uploaded: '2026-01-08' },
    { id: 7, category: 'Braiding', title: 'Ghana Braids', uploaded: '2026-01-07' },
    { id: 8, category: 'Coloring', title: 'Ombre', uploaded: '2026-01-07' },
    { id: 9, category: 'Natural Hair', title: 'Afro Style', uploaded: '2026-01-06' },
    { id: 10, category: 'Hairstyles', title: 'Layered Cut', uploaded: '2026-01-05' },
    { id: 11, category: 'Braiding', title: 'Knotless Braids', uploaded: '2026-01-05' },
    { id: 12, category: 'Special Events', title: 'Prom Updo', uploaded: '2026-01-04' },
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Gallery Management</h2>
          <p className="text-gray-400 text-sm mt-1">Upload and organize your portfolio images</p>
        </div>
        <Button>
          <span className="mr-2">📸</span> Upload Images
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-400 mb-1">Total Images</p>
          <p className="text-2xl font-bold text-white">{images.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-400 mb-1">Categories</p>
          <p className="text-2xl font-bold text-gold-500">{categories.length - 1}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-400 mb-1">This Week</p>
          <p className="text-2xl font-bold text-green-400">8</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-400 mb-1">Storage Used</p>
          <p className="text-2xl font-bold text-white">45 MB</p>
        </Card>
      </div>

      {/* Upload Section */}
      <Card className="p-8">
        <div className="border-2 border-dashed border-charcoal-700 rounded-2xl p-12 text-center hover:border-gold-500/50 transition-colors cursor-pointer">
          <div className="text-5xl mb-4">📤</div>
          <h3 className="text-lg font-semibold text-white mb-2">Drag & Drop Images Here</h3>
          <p className="text-sm text-gray-400 mb-4">or click to browse files</p>
          <Button variant="secondary">
            Select Files
          </Button>
          <p className="text-xs text-gray-500 mt-4">Supports: JPG, PNG, WebP (Max 5MB each)</p>
        </div>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category.toLowerCase())}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.toLowerCase()
                ? 'bg-gold-500 text-charcoal-950 shadow-gold-glow'
                : 'bg-charcoal-800 text-gray-400 hover:text-white hover:bg-charcoal-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredImages.map((image) => (
          <Card key={image.id} className="group relative overflow-hidden cursor-pointer">
            {/* Image Placeholder */}
            <div className="aspect-square bg-gradient-to-br from-gold-900/20 to-charcoal-800 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="text-4xl mb-2 opacity-50">✨</div>
                <p className="text-xs text-gold-500/50">Image</p>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-charcoal-950/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-white font-semibold mb-1 text-sm">{image.title}</p>
                <p className="text-xs text-gray-400 mb-4">{image.category}</p>
                <div className="flex justify-center space-x-2">
                  <button className="p-2 bg-gold-500 text-charcoal-950 rounded-lg hover:bg-gold-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-2 left-2">
              <span className="text-xs bg-charcoal-950/80 text-gold-500 px-2 py-1 rounded-full backdrop-blur-sm">
                {image.category}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Bulk Actions */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              className="w-4 h-4 text-gold-500 bg-charcoal-800 border-charcoal-700 rounded focus:ring-gold-500"
            />
            <span className="text-sm text-gray-400">Select All ({filteredImages.length} items)</span>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <span className="mr-2">📂</span> Move to Category
            </Button>
            <Button variant="secondary" size="sm">
              <span className="mr-2">🗑️</span> Delete Selected
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
