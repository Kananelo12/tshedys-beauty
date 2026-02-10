"use client";

import { motion } from "framer-motion";
import { Crown, Heart, Sparkles, Wand2 } from "lucide-react";

export default function Features() {
  const items = [
    {
      title: "Personalized Styling",
      desc: "Consultation-led haircuts and magical styling sessions tailored just for you.",
      icon: Crown,
      gradient: "from-pink-400 to-rose-400",
    },
    {
      title: "Bridal & Events",
      desc: "Elegant updos, fantasy braids, and enchanting styles that last all day.",
      icon: Heart,
      gradient: "from-purple-400 to-pink-400",
    },
    {
      title: "Nails & Manicure",
      desc: "Detail-driven nail art and luxurious care fit for royalty.",
      icon: Sparkles,
      gradient: "from-rose-400 to-pink-400",
    },
    {
      title: "Magic Treatments",
      desc: "Deep conditioning, restorative care, and transformative treatments.",
      icon: Wand2,
      gradient: "from-pink-400 to-purple-400",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-pink-50 via-blush-50 to-purple-50 opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl md:text-5xl font-serif font-bold bg-linear-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-4">
            ✨ The Magic of Beauty
          </h3>
          <p className="text-lg text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
            A curated menu of enchanting services designed to enhance your
            natural beauty and unleash your inner royalty.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <motion.div
                className="glass border-2 border-pink-200 rounded-3xl p-8 h-full transition-all cursor-pointer relative overflow-hidden"
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  boxShadow:
                    "0 20px 60px rgba(255, 71, 179, 0.3), 0 8px 24px rgba(247, 37, 133, 0.25)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-linear-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-elevated`}
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon size={32} className="text-white" />
                </motion.div>

                {/* Content */}
                <h4 className="font-bold text-xl text-charcoal-800 mb-3 group-hover:text-pink-700 transition-colors">
                  {item.title}
                </h4>
                <p className="text-charcoal-600 text-sm leading-relaxed">
                  {item.desc}
                </p>

                {/* Hover Arrow */}
                <motion.div
                  className="absolute bottom-6 right-6 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white text-lg">→</span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
