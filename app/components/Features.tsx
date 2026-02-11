"use client";

import { Crown, Heart, Sparkles, Wand2 } from "lucide-react";

export default function Features() {
  const items = [
    {
      title: "Personalized Styling",
      desc: "Consultation-led haircuts and styling sessions tailored just for you.",
      icon: Crown,
      color: "bg-pink-500",
    },
    {
      title: "Bridal & Events",
      desc: "Elegant updos, braids, and styles that last all day.",
      icon: Heart,
      color: "bg-pink-500",
    },
    {
      title: "Nails & Manicure",
      desc: "Detail-driven nail art and luxurious care.",
      icon: Sparkles,
      color: "bg-pink-500",
    },
    {
      title: "Beauty Treatments",
      desc: "Deep conditioning, restorative care, and transformative treatments.",
      icon: Wand2,
      color: "bg-pink-500",
    },
  ];

  return (
    <section className="py-16 bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A curated menu of services designed to enhance your
            natural beauty and boost your confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-pink-200 rounded-2xl p-8 hover:shadow-pink-md hover:scale-105 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl ${item.color} flex items-center justify-center mb-6 shadow-sm`}>
                <item.icon size={32} className="text-white" />
              </div>

              {/* Content */}
              <h3 className="font-bold text-xl text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
