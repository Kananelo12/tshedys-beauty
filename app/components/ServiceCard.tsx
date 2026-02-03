'use client';

import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  icon?: string;
}

export default function ServiceCard({ title, description, price, duration, icon }: ServiceCardProps) {
  return (
    <motion.div 
      className="bg-white rounded-xl p-6 border border-gray-200 card-elevated group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Icon/Image placeholder */}
      <motion.div 
        className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-sage-200 transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="text-2xl">{icon || '✨'}</span>
      </motion.div>

      {/* Service Info */}
      <h3 className="text-xl font-serif font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>

      {/* Price & Duration */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">From</p>
          <p className="text-lg font-semibold text-sage-600">{price}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Duration</p>
          <p className="text-sm text-gray-700">{duration}</p>
        </div>
      </div>
    </motion.div>
  );
}
