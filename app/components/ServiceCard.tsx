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
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-soft-md transition-shadow duration-300">
      {/* Icon */}
      {icon && (
        <div className="w-11 h-11 bg-pink-50 rounded-lg flex items-center justify-center mb-4">
          <div className="text-pink-500">{icon}</div>
        </div>
      )}

      {/* Service Title */}
      <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed mb-5">{description}</p>

      {/* Price */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">From</span>
        <span className="text-lg font-bold text-pink-600">{price}</span>
      </div>
    </div>
  );
}
