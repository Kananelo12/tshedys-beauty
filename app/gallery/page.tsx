"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lightbox from "../components/Lightbox";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

type Category = "all" | "braids" | "makeup";

interface GalleryItem {
  label: string;
  price?: number;
  image: string;
  category: "braids" | "makeup";
}

const galleryItems: GalleryItem[] = [
  { label: 'Mermaid Braids', price: 580, image: '/gallery/gallery-1.jpeg', category: 'braids' },
  { label: 'French Curls', price: 600, image: '/gallery/gallery-2.jpeg', category: 'braids' },
  { label: 'Medium Curly Braids', price: 480, image: '/gallery/gallery-3.jpeg', category: 'braids' },
  { label: 'Jumbo Braids', price: 380, image: '/gallery/gallery-4.jpeg', category: 'braids' },
  { label: "Small Knotless Braids", price: 580, image: "/gallery/gallery-5.jpeg", category: 'braids' },
  { label: "French Curls", price: 450, image: "/gallery/gallery-6.jpeg", category: 'braids' },
  { label: "French Curls", price: 650, image: "/gallery/gallery-7.jpeg", category: 'braids' },
  { label: "Bohomian Knotless", price: 650, image: "/gallery/bohomain-knotless.jpeg", category: 'braids' },
  { label: "Small Knotless Braids", price: 580, image: "/gallery/gallery-9.jpeg", category: 'braids' },
  { label: "Small Knotless Braids", price: 580, image: "/gallery/gallery-10.jpeg", category: 'braids' },
  { label: "Short Curled Braids", price: 400, image: "/gallery/gallery-11.jpeg", category: 'braids' },
  { label: "Mermaid Braids", price: 480, image: "/gallery/gallery-12.jpeg", category: 'braids' },
  { label: "French Curls", price: 400, image: "/gallery/gallery-13.jpeg", category: 'braids' },
  { label: "Gel Hairstyle", price: 200, image: "/gallery/gel-hairstyle.jpeg", category: 'braids' },
  { label: "Bubble Braids", price: 350, image: "/gallery/gallery-14.jpg", category: 'braids' },
  { label: "Koroba Braids", price: 350, image: "/gallery/koroba-braids.jpeg", category: 'braids' },
  { label: "Extended Essence", price: 180, image: "/gallery/gallery-15.jpeg", category: 'braids' },
  { label: "Extended Essence", price: 180, image: "/gallery/gallery-16.jpeg", category: 'braids' },
  { label: "Braided 2 Ponytail Hairstyles", price: 200, image: "/gallery/gallery-17.jpeg", category: 'braids' },

  // Makeup
  { label: "Makeup Look", image: "/gallery/make-up-1.jpeg", category: 'makeup' },
  { label: "Glam Makeup", image: "/gallery/make-up-2.jpeg", category: 'makeup' },
  { label: "Makeup Look", image: "/gallery/make-up-3.jpeg", category: 'makeup' },
];

const tabs: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Braids & Styles", value: "braids" },
  { label: "Makeup", value: "makeup" },
];

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filtered = activeTab === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeTab);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-18 bg-cream-50">
        {/* Header */}
        <section className="py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-600 mb-3">
              Our Portfolio
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
              Gallery
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
              A curated selection of our signature styles and transformations
            </p>
            <p className="mt-3 inline-block bg-pink-50 text-pink-600 text-xs sm:text-sm font-medium px-4 py-2 rounded-full">
              All hairstyles include free hair wash &amp; hairpiece
            </p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="pb-6 sm:pb-8">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeTab === tab.value
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="pb-14 sm:pb-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((item, i) => (
                <div
                  key={item.image}
                  className="group relative aspect-3/4 rounded-xl overflow-hidden cursor-pointer bg-gray-100"
                  onClick={() => openLightbox(i)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Hover Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-sm font-semibold">
                      {item.label}
                    </p>
                    {item.category === "braids" && (
                      <>
                        <p className="text-gold-400 text-xs font-semibold">
                          M{item.price}
                        </p>
                        <Link
                          href={`/book?style=${encodeURIComponent(item.label)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-block mt-1.5 text-xs text-gold-400 hover:text-gold-300 font-medium transition-colors"
                        >
                          Book this style →
                        </Link>
                      </>
                    )}
                  </div>
                  {/* Always-visible label on mobile */}
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-linear-to-t from-black/50 to-transparent sm:hidden">
                    <p className="text-white text-xs font-medium">
                      {item.label}
                    </p>
                    {item.category === "braids" && (
                      <p className="text-gold-400 text-[10px] font-semibold">
                        M{item.price}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-black text-white">
          <div className="max-w-xl mx-auto px-5 sm:px-6 text-center">
            <h2 className="text-white/70 text-2xl sm:text-3xl font-serif font-bold mb-3">
              Inspired by what you see?
            </h2>
            <p className="text-white/60 text-sm mb-7">
              We&apos;ll help you recreate any of these looks with expert care.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-colors group"
            >
              Book Appointment
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={filtered.map((item) => item.image)}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
        />
      )}
    </>
  );
}
