'use client';

import { ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  icon?: ReactNode;
}

export default function ServiceCard({ title, description, price, icon }: ServiceCardProps) {
  return (
    <div className="bg-white border-2 border-pink-200 rounded-2xl p-8 hover:shadow-pink-md hover:scale-105 transition-all duration-300">
      {/* Icon */}
      <div className="w-16 h-16 bg-pink-500 rounded-xl flex items-center justify-center mb-6 shadow-sm">
        <div className="text-white">{icon}</div>
      </div>

      {/* Service Title */}
      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 text-base mb-6 leading-relaxed">{description}</p>

      {/* Divider */}
      <div className="h-px bg-pink-200 mb-4" />

      {/* Price */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Starting From</p>
        <p className="text-2xl font-bold text-pink-500">{price}</p>
      </div>
    </div>
  );
}
