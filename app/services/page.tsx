"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Search, ArrowRight, Loader2 } from "lucide-react";

interface Service {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setServices(data.services);
        } else {
          setError("Failed to load services.");
        }
      })
      .catch(() => setError("Failed to load services."))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(services.map((s) => s.category)))],
    [services],
  );

  const filtered = useMemo(() => {
    let result = services;
    if (activeCategory !== "All") {
      result = result.filter((s) => s.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q),
      );
    }
    return result;
  }, [services, activeCategory, search]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[72px] bg-cream-50">
        {/* Header */}
        <section className="py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-600 mb-3">
              Our Menu
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
              Services &amp; Pricing
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
              Tailored hair, braiding, and beauty services crafted by expert
              stylists
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-4 bg-white border-b border-gray-100 sticky top-[72px] z-30">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  aria-label="Search services"
                  placeholder="Search services..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none transition-colors"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      activeCategory === cat
                        ? "bg-pink-500 text-white border-pink-500"
                        : "border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 size={28} className="animate-spin mb-3" />
                <p className="text-sm">Loading services...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-sm">
                  No services found
                  {search ? ` for "${search}"` : ""}.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filtered.map((service) => (
                  <div
                    key={service._id}
                    className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-soft-md transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg font-serif font-bold text-gray-900">
                        {service.name}
                      </h3>
                      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">
                        {service.category}
                      </span>
                    </div>

                    {service.description && (
                      <p className="text-gray-500 text-sm leading-relaxed mb-5">
                        {service.description}
                      </p>
                    )}

                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                        From
                      </span>
                      <span className="text-lg font-bold text-pink-600">
                        M{service.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-black text-white">
          <div className="max-w-2xl mx-auto px-5 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3">
              Ready to Book?
            </h2>
            <p className="text-white/60 text-sm mb-7">
              Select your service and choose a convenient time for your visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white/80 text-sm font-semibold rounded-full hover:bg-white/5 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-colors group"
              >
                Book Appointment
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* Info Strip */}
        <section className="py-12 bg-cream-50">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Personal Consultations
                </h3>
                <p className="text-xs text-gray-500">
                  Free 10-minute consultation to match style with your
                  lifestyle.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Premium Products
                </h3>
                <p className="text-xs text-gray-500">
                  We use salon-grade products selected for your needs.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Loyalty Rewards
                </h3>
                <p className="text-xs text-gray-500">
                  Earn points and get exclusive offers as a member.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
