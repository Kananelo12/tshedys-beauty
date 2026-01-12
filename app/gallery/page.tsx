'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Hairstyles', 'Braiding', 'Coloring', 'Natural Hair', 'Special Events'];

  // Placeholder gallery items with descriptions
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
      <main className="min-h-screen pt-20">
        {/* Header Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950">
          <div className="absolute inset-0 bg-gold-glow opacity-10"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-script font-bold text-gold-500 mb-6 gold-glow">
              Our Gallery
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our portfolio of stunning transformations and beautiful hairstyles. 
              Get inspired for your next look!
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-charcoal-900 border-b border-charcoal-800 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gold-500 text-charcoal-950 shadow-gold-glow'
                      : 'bg-charcoal-800 text-gray-300 hover:bg-charcoal-700 hover:text-gold-500 border border-charcoal-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className="group relative bg-charcoal-900 rounded-2xl overflow-hidden border border-charcoal-800 card-hover cursor-pointer"
                >
                  {/* Image Placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-gold-900/20 to-charcoal-800 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="text-6xl mb-4 opacity-50">✨</div>
                      <p className="text-gold-500/50 text-sm">Image Placeholder</p>
                    </div>
                  </div>
                  
                  {/* Overlay with info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-xs text-gold-500 mb-2">{item.category}</span>
                    <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-charcoal-800 text-gold-500 font-semibold rounded-full hover:bg-charcoal-700 border border-gold-500/30 transition-all duration-300">
                Load More
              </button>
            </div>
          </div>
        </section>

        {/* Instagram CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal-900">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-6">📸</div>
            <h2 className="text-4xl md:text-5xl font-script font-bold text-gold-500 mb-6">
              Follow Us on Instagram
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              See our latest work and get daily beauty inspiration. Tag us in your photos!
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@tshedysbeauty</span>
            </a>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-script font-bold text-gold-500 mb-6">
              Love What You See?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book your appointment and let us create your dream look
            </p>
            <a
              href="/book"
              className="inline-block px-8 py-3 bg-gold-500 text-charcoal-950 font-semibold rounded-full hover:bg-gold-400 hover:shadow-gold-glow transition-all duration-300"
            >
              Book Your Appointment
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
