'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Button from '../components/Button';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Hairstyles', 'Braiding', 'Coloring', 'Natural Hair', 'Events'];

  const images = [
    '/CHRISTMAS Lunch 23136B.JPG', '/CHRISTMAS Lunch 23137C.JPG', '/CHRISTMAS Lunch 23138D.JPG',
    '/CHRISTMAS Lunch 23150P.JPG', '/CHRISTMAS Lunch 23151Q.JPG', '/CHRISTMAS Lunch 23169BI.JPG',
    '/CHRISTMAS Lunch 23176BP.JPG', '/CHRISTMAS Lunch 23181BU.JPG', '/CHRISTMAS Lunch 23182BV.JPG',
    '/CHRISTMAS Lunch 23183BW.JPG', '/CHRISTMAS Lunch 23184BX.JPG', '/CHRISTMAS Lunch 23188CB.JPG'
  ];
  
  const galleryItems = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    category: categories[(i % (categories.length - 1)) + 1],
    title: `Style ${i + 1}`,
    src: images[i],
  }));

  const filtered = selectedCategory === 'All' ? galleryItems : galleryItems.filter(g => g.category === selectedCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 bg-cream-50">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900">Our Gallery</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">A curated selection of our recent styles and looks. Tap to view details.</p>
          </div>
        </section>

        <section className="py-6 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm ${selectedCategory===cat ? 'bg-sage-600 text-white' : 'bg-cream-100 text-gray-700'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map(item => (
                <div key={item.id} className="break-inside-avoid rounded-lg overflow-hidden bg-white shadow-sm">
                  <Image src={item.src} alt={item.title} width={800} height={600} className="w-full h-auto object-cover" />
                  <div className="p-4">
                    <div className="text-xs text-sage-600 mb-1">{item.category}</div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-cream-100 rounded-xl p-10 text-center">
              <h3 className="text-xl font-serif font-semibold">Inspired? Book your visit</h3>
              <p className="text-gray-600 mt-2">We’ll help you recreate any of these looks with expert care.</p>
              <div className="mt-4">
                <Link href="/book">
                  <Button>Book Appointment</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
