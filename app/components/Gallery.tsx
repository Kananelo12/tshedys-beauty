'use client';

import { motion } from 'framer-motion';

export default function Gallery() {
  const urls = ['/CHRISTMAS Lunch 23144J.JPG','/CHRISTMAS Lunch 23155U.JPG','/CHRISTMAS Lunch 23177BQ.JPG','/CHRISTMAS Lunch 23229DQ.JPG','/CHRISTMAS Lunch 23248EJ.JPG','/CHRISTMAS Lunch 23270FF.JPG'];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-serif font-semibold text-gray-900">Our Photo Gallery</h3>
          <p className="text-gray-600">Moments of style and care from our salon.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {urls.map((src, i) => (
            <motion.div 
              key={i} 
              className="rounded-lg overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={src} alt={`gallery-${i}`} className="w-full h-48 object-cover group-hover:brightness-110 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
