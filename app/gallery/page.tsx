'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Button from '../components/Button';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [itemsToShow, setItemsToShow] = useState(12);

  const categories = ['All', 'Hairstyles', 'Braiding', 'Coloring', 'Natural Hair', 'Events'];

  const images = [
    '/CHRISTMAS Lunch 23136B.JPG', '/CHRISTMAS Lunch 23137C.JPG', '/CHRISTMAS Lunch 23138D.JPG',
    '/CHRISTMAS Lunch 23144J.JPG', '/CHRISTMAS Lunch 23150P.JPG', '/CHRISTMAS Lunch 23151Q.JPG',
    '/CHRISTMAS Lunch 23155U.JPG', '/CHRISTMAS Lunch 23169BI.JPG', '/CHRISTMAS Lunch 23171BK.JPG',
    '/CHRISTMAS Lunch 23176BP.JPG', '/CHRISTMAS Lunch 23177BQ.JPG', '/CHRISTMAS Lunch 23181BU.JPG',
    '/CHRISTMAS Lunch 23182BV.JPG', '/CHRISTMAS Lunch 23183BW.JPG', '/CHRISTMAS Lunch 23184BX.JPG',
    '/CHRISTMAS Lunch 23185BY.JPG', '/CHRISTMAS Lunch 23188CB.JPG', '/CHRISTMAS Lunch 23189CC.JPG',
    '/CHRISTMAS Lunch 23208CV.JPG', '/CHRISTMAS Lunch 232136B.JPG', '/CHRISTMAS Lunch 23218DF.JPG',
    '/CHRISTMAS Lunch 23219DG.JPG', '/CHRISTMAS Lunch 23221DI.JPG', '/CHRISTMAS Lunch 23222DJ.JPG',
    '/CHRISTMAS Lunch 23225DM.JPG', '/CHRISTMAS Lunch 23226DN.JPG', '/CHRISTMAS Lunch 23229DQ.JPG',
    '/CHRISTMAS Lunch 23231DS.JPG', '/CHRISTMAS Lunch 23232DT.JPG', '/CHRISTMAS Lunch 23235DW.JPG',
    '/CHRISTMAS Lunch 23238DZ.JPG', '/CHRISTMAS Lunch 23239EA.JPG', '/CHRISTMAS Lunch 23240EB.JPG',
    '/CHRISTMAS Lunch 23242ED.JPG', '/CHRISTMAS Lunch 23243EE.JPG', '/CHRISTMAS Lunch 23244EF.JPG',
    '/CHRISTMAS Lunch 23246EH.JPG', '/CHRISTMAS Lunch 23248EJ.JPG', '/CHRISTMAS Lunch 23249EK.JPG',
    '/CHRISTMAS Lunch 23250EL.JPG', '/CHRISTMAS Lunch 23254EP.JPG', '/CHRISTMAS Lunch 23255EQ.JPG',
    '/CHRISTMAS Lunch 23257ES.JPG', '/CHRISTMAS Lunch 23258ET.JPG', '/CHRISTMAS Lunch 23262EX.JPG',
    '/CHRISTMAS Lunch 23264EZ.JPG', '/CHRISTMAS Lunch 23266FB.JPG', '/CHRISTMAS Lunch 23267FC.JPG',
    '/CHRISTMAS Lunch 23270FF.JPG', '/CHRISTMAS Lunch 23273FI.JPG', '/CHRISTMAS Lunch 23275FK.JPG',
    '/CHRISTMAS Lunch 23297GG.JPG', '/CHRISTMAS Lunch 23300GJ.JPG', '/CHRISTMAS Lunch 23302GL.JPG',
    '/CHRISTMAS Lunch 23303GM.JPG', '/CHRISTMAS Lunch 23304GN.JPG', '/CHRISTMAS Lunch 23305GO.JPG',
  ];
  
  const galleryItems = images.map((src, i) => ({
    id: i + 1,
    category: categories[(i % (categories.length - 1)) + 1],
    title: `Style ${i + 1}`,
    src: src,
  }));

  const filtered = selectedCategory === 'All' ? galleryItems : galleryItems.filter(g => g.category === selectedCategory);
  const displayedItems = filtered.slice(0, itemsToShow);
  const hasMore = displayedItems.length < filtered.length;

  const loadMore = () => {
    setItemsToShow(filtered.length);
  };

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
              {displayedItems.map(item => (
                <div key={item.id} className="break-inside-avoid rounded-lg overflow-hidden bg-white shadow-sm">
                  <Image src={item.src} alt={item.title} width={800} height={600} className="w-full h-auto object-cover" />
                  <div className="p-4">
                    <div className="text-xs text-sage-600 mb-1">{item.category}</div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-8">
                <Button variant="outline" onClick={loadMore}>Load More</Button>
              </div>
            )}
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
