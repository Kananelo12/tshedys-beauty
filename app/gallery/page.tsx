"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lightbox from "../components/Lightbox";
import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

const galleryItems = [
  { label: "Jumbo Braids", price: 150, image: "/gallery/jumbo-braids.jpeg" },
  { label: "Small Boho Braids", price: 300, image: "/gallery/small-boho-braids.jpeg" },
  { label: "French Curls", price: 200, image: "/gallery/french-curls.jpeg" },
  { label: "Short Curled Braids", price: 280, image: "/gallery/short-curled-braids.jpeg" },
  { label: "Medium Curly Braids", price: 230, image: "/gallery/medium-curly-braids.jpeg" },
  { label: "French Curls", price: 200, image: "/gallery/french-curls2.jpeg" },
  { label: "Gel Hairstyle", price: 100, image: "/gallery/gel-hairstyle.jpeg" },
  { label: "Bubble Braids", price: 350, image: "/gallery/bubble-braids.jpeg" },
  { label: "Koroba Braids", price: 350, image: "/gallery/koroba-braids.jpeg" },
  { label: "Extended Essence", price: 150, image: "/gallery/extended-essence.jpeg" },
  { label: "Small Knotless Braids", price: 250, image: "/gallery/small-knotless-braids.jpeg" },
  { label: "Mermaid Braids", price: 580, image: "/gallery/mermaid-braids.jpeg" },
];

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const gridRef = useRef<HTMLElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);
  const heroCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Observe which hero slide is most visible on mobile
  useEffect(() => {
    const cards = heroCardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveHeroSlide(idx);
          }
        });
      },
      { root: heroScrollRef.current, threshold: 0.6 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const scrollToHeroSlide = useCallback((idx: number) => {
    heroCardRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Split into hero feature (first 3) and the rest
  const heroImages = galleryItems.slice(0, 3);
  const restImages = galleryItems.slice(3);

  return (
    <>
      <Navbar hasDarkHero />
      <main className="min-h-screen bg-foreground">
        {/* ——— HERO: 3-image showcase ——— */}
        <section className="relative h-[70vh] sm:h-screen overflow-hidden">
          {/* Mobile: horizontal scroll | Desktop: 3-col grid */}
          <div
            ref={heroScrollRef}
            className="flex sm:grid sm:grid-cols-3 h-full overflow-x-auto snap-x snap-mandatory sm:overflow-visible scrollbar-hide"
          >
            {heroImages.map((item, i) => (
              <div
                key={i}
                ref={(el) => { heroCardRefs.current[i] = el; }}
                className="relative min-w-[85vw] sm:min-w-0 overflow-hidden cursor-pointer group snap-start"
                onClick={() => openLightbox(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
                {/* Label — always visible on mobile, hover on desktop */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-8 sm:translate-y-4 sm:group-hover:translate-y-0 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white text-sm sm:text-base font-medium">{item.label}</p>
                  <p className="text-white/50 text-xs font-medium">M{item.price}</p>
                  <Link
                    href={`/book?style=${encodeURIComponent(item.label)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block mt-1 text-xs text-white/60 hover:text-white font-medium transition-colors"
                  >
                    Book this style →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-5">
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-white/50 mb-3 sm:mb-4">
              Portfolio
            </p>
            <h1 className="text-4xl sm:text-7xl lg:text-9xl font-serif font-medium text-white tracking-tight text-center">
              Gallery
            </h1>
          </div>

          {/* Mobile dot indicators */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 sm:hidden">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToHeroSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeHeroSlide
                    ? "w-6 h-2.5 bg-white"
                    : "w-2.5 h-2.5 bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Scroll prompt */}
          <button
            onClick={scrollToGrid}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors cursor-pointer z-10"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase">Explore</span>
            <ArrowDown size={16} className="animate-bounce" />
          </button>
        </section>

        {/* ——— GRID: Asymmetric bento ——— */}
        <section ref={gridRef} className="bg-background py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            {/* Section intro */}
            <div className="flex items-center gap-4 mb-14">
              <div className="h-px flex-1 bg-cream-200" />
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-foreground/30">
                {galleryItems.length} Styles
              </p>
              <div className="h-px flex-1 bg-cream-200" />
            </div>

            {/* Bento grid — intentionally asymmetric */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[260px] lg:auto-rows-[300px]">
              {restImages.map((item, i) => {
                // Asymmetric pattern — col-span-2 only on md+ to avoid breaking 2-col mobile
                const spanClass =
                  i === 0
                    ? "md:col-span-2 md:row-span-2"
                    : i === 3
                      ? "md:col-span-2"
                      : i === 5
                        ? "md:col-span-2"
                        : i === 7
                          ? "md:row-span-2"
                          : "";

                return (
                  <div
                    key={i}
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-cream-200 ${spanClass}`}
                    onClick={() => openLightbox(i + 3)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark gradient overlay — hover on desktop */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Label — always visible on mobile, hover on desktop */}
                    <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5 sm:translate-y-3 sm:group-hover:translate-y-0 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 ease-out">
                      <p className="text-white text-[11px] sm:text-sm font-medium mb-0.5">{item.label}</p>
                      <p className="text-white/50 text-[10px] sm:text-xs font-medium">M{item.price}</p>
                      <Link
                        href={`/book?style=${encodeURIComponent(item.label)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hidden sm:inline-block text-xs text-white/60 hover:text-white font-medium transition-colors"
                      >
                        Book this style →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ——— CTA: full-bleed ——— */}
        <section className="relative py-28 sm:py-36 overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/CHRISTMAS Lunch 23258ET.JPG"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/40 mb-4">
              Ready?
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-medium text-white mb-4 sm:mb-5">
              Let&apos;s create your<br className="hidden sm:inline" /> next signature look
            </h2>
            <p className="text-white/40 text-sm mb-8 sm:mb-10 max-w-md mx-auto">
              Every style in this gallery was crafted with love. Yours will be too.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-foreground text-sm font-semibold rounded-full hover:bg-cream-100 transition-all group"
            >
              Book Your Appointment
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
