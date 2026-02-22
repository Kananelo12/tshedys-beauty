"use client";

import { Crown, Heart, Sparkles, Wand2 } from "lucide-react";

export default function Features() {
  const items = [
    {
      title: "Personalized Styling",
      desc: "Consultation-led braiding and styling sessions tailored to your unique look.",
      icon: Crown,
    },
    {
      title: "Bridal & Events",
      desc: "Elegant updos, braids, and styles crafted to last all day and night.",
      icon: Heart,
    },
    {
      title: "Nails & Manicure",
      desc: "Detail-driven nail art and luxurious hand care treatments.",
      icon: Sparkles,
    },
    {
      title: "Beauty Treatments",
      desc: "Deep conditioning, restorative care, and transformative treatments.",
      icon: Wand2,
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-600 mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            A Beautiful Experience
          </h2>
          <p className="text-base text-gray-500 max-w-lg mx-auto">
            Services designed to enhance your natural beauty and boost your confidence
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-soft-md transition-shadow duration-300 text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-pink-50 flex items-center justify-center mx-auto mb-5">
                <item.icon size={22} className="text-pink-500" />
              </div>
              <h3 className="font-serif font-bold text-base text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
