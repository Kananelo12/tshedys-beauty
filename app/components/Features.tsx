'use client';

import { motion } from 'framer-motion';

export default function Features() {
  const items = [
    { title: 'Personalised Styling', desc: 'Consultation-led haircuts and styling.' },
    { title: 'Bridal & Events', desc: 'Elegant updos and long-lasting styles.' },
    { title: 'Nails & Manicure', desc: 'Detail-driven nail art and care.' },
    { title: 'Treatments', desc: 'Deep conditioning and restorative care.' },
  ];

  return (
    <section className="py-12 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-serif font-semibold text-gray-900">The Enigma of Beauty</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">A curated menu of services designed to enhance your natural beauty.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, idx) => (
            <motion.div 
              key={idx} 
              className="bg-white rounded-xl p-6 shadow-soft-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h4 className="font-medium text-gray-900 mb-2">{it.title}</h4>
              <p className="text-gray-600 text-sm">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
