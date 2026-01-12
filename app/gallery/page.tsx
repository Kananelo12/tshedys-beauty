'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Hairstyles', 'Braiding', 'Coloring', 'Natural Hair', 'Special Events'];

  const galleryItems = [
    { id: 1, category: 'Hairstyles', title: 'Elegant Updo', description: 'Perfect for special occasions' },
    { id: 2, category: 'Braiding', title: 'Box Braids', description: 'Classic protective style' },
    { id: 3, category: 'Coloring', title: 'Balayage Highlights', description: 'Sun-kissed natural look' },
    { id: 4, category: 'Natural Hair', title: 'Twist Out', description: 'Beautiful defined curls' },
    { id: 5, category: 'Special Events', title: 'Bridal Style', description: 'Romantic wedding hair' },
    { id: 6, category: 'Hairstyles', title: 'Bob Cut', description: 'Sleek and modern' },
    { id: 7, category: 'Braiding', title: 'Ghana Braids', description: 'Intricate cornrow pattern' },
    { id: 8, category: 'Coloring', title: 'Ombre Color', description: 'Gradual color transition' },
    { id: 9, category: 'Natural Hair', title: 'Afro Style', description: 'Full natural volume' },
    { id: 10, category: 'Hairstyles', title: 'Layered Cut', description: 'Dynamic movement' },
    { id: 11, category: 'Braiding', title: 'Knotless Braids', description: 'Lightweight and natural' },
    { id: 12, category: 'Special Events', title: 'Prom Updo', description: 'Glamorous evening style' },
  ];

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-cream-50">
        {/* Header Section */}
        <section className="relative section-padding bg-gradient-to-br from-sage-50 to-cream-50">
          <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-serif font-medium text-gray-900 mb-6">
              Our Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of stunning transformations and beautiful hairstyles. 
              Get inspired for your next look!
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-sage-600 text-white'
                      : 'bg-cream-100 text-gray-700 hover:bg-cream-200 hover:text-sage-600 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 card-elevated card-hover cursor-pointer"
                >
                  {/* Image Placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-sage-100 to-cream-100 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="text-6xl mb-4 opacity-50">✨</div>
                      <p className="text-gray-400 text-sm">Image Placeholder</p>
                    </div>
                  </div>
                  
                  {/* Overlay with info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-xs text-sage-300 mb-2">{item.category}</span>
                    <h3 className="text-lg font-serif font-medium text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-200">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-sage-600 text-white font-medium rounded-lg hover:bg-sage-700 transition-all duration-300">
                Load More
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-sage-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6">
              Ready to Get Your Perfect Look?
            </h2>
            <p className="text-xl text-sage-50 mb-8">
              Book your appointment today and let us create something beautiful together
            </p>
            <a
              href="/book"
              className="inline-block px-8 py-3 bg-white text-sage-600 font-medium rounded-lg hover:bg-cream-50 transition-all duration-300"
            >
              Schedule Your Visit
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
