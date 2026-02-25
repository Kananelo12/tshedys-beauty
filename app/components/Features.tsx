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
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background image — fixed parallax effect */}
      <div className="absolute inset-0 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/about-banner.png')" }} />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-pink-300 mb-4">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white">
              A Beautiful Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-8 text-center hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mb-6 mx-auto group-hover:bg-pink-500 transition-colors duration-500">
                  <item.icon
                    size={24}
                    className="text-pink-500 group-hover:text-white transition-colors duration-500"
                  />
                </div>
                <h3 className="font-serif font-medium text-lg text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-foreground/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
