'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Pricing() {
  const plans = [
    { title: 'Hair Cut', price: '$55.99', items: ['Wash & Style', 'Trim', 'Blowdry'] },
    { title: 'Makeup', price: '$98.00', items: ['Full Face', 'Lashes', 'Setting'] },
    { title: 'Hair Color', price: '$106.59', items: ['Color', 'Toner', 'Gloss'] },
  ];

  return (
    <section className="py-12 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-serif font-semibold text-gray-900">Customized Pricing for Your Beauty</h3>
          <p className="text-gray-600">Transparent pricing and curated packages to suit your needs.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.div 
              key={i} 
              className="bg-white rounded-xl p-6 shadow-soft-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">{p.title}</h4>
                <div className="text-sage-700 font-semibold">{p.price}</div>
              </div>
              <ul className="text-gray-600 text-sm mb-4 space-y-2">
                {p.items.map((it, idx) => (<li key={idx}>• {it}</li>))}
              </ul>
              <Link href="/book" className="inline-flex items-center px-5 py-2 rounded-full border-2 border-sage-600 text-sage-700 hover:bg-sage-50 hover:shadow-md transition-all duration-300">Appointment Now</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
