"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lightbox from "../components/Lightbox";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const galleryItems = [
  { label: "Jumbo Braids", image: "/gallery/jumbo-braids.jpeg" },
  { label: "Small Boho Braids", image: "/gallery/small-boho-braids.jpeg" },
  { label: "French Curls", image: "/gallery/french-curls.jpeg" },
  { label: "Short Curled Braids", image: "/gallery/short-curled-braids.jpeg" },
  { label: "Medium Curly Braids", image: "/gallery/medium-curly-braids.jpeg" },
  { label: "French Curls", image: "/gallery/french-curls2.jpeg" },
  { label: "Gel Hairstyle", image: "/gallery/gel-hairstyle.jpeg" },
  { label: "Bubble Braids", image: "/gallery/bubble-braids.jpeg" },
  { label: "Koroba Braids", image: "/gallery/koroba-braids.jpeg" },
  { label: "Extended Essence", image: "/gallery/extended-essence.jpeg" },
  {
    label: "Small Knotless Braids",
    image: "/gallery/small-knotless-braids.jpeg",
  },
  { label: "Mermaid Braids", image: "/gallery/mermaid-braids.jpeg" },
];

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="pb-14 sm:pb-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {galleryItems.map((item, i) => (
                <div
                  key={i}
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
                    <Link
                      href={`/book?style=${encodeURIComponent(item.label)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-block mt-1.5 text-xs text-gold-400 hover:text-gold-300 font-medium transition-colors"
                    >
                      Book this style →
                    </Link>
                  </div>
                  {/* Always-visible label on mobile */}
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-linear-to-t from-black/50 to-transparent sm:hidden">
                    <p className="text-white text-xs font-medium">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-black text-white">
          <div className="max-w-xl mx-auto px-5 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3">
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
          images={galleryItems.map((item) => item.image)}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
        />
      )}
    </>
  );
}
