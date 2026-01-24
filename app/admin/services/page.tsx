"use client";

import { useState } from 'react';

export default function AdminServicesPage() {
  const [services] = useState([
    { id: 1, title: 'Haircut & Styling', price: 'R250' },
    { id: 2, title: 'Keratin Treatment', price: 'R1200' },
    { id: 3, title: 'Braiding', price: 'R400' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-medium text-gray-900">Services</h2>
        <a href="#" className="px-4 py-2 rounded-full bg-sage-600 text-white">Add Service</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((s) => (
          <div key={s.id} className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between">
            <div>
              <p className="font-medium">{s.title}</p>
              <p className="text-sm text-gray-500">{s.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <a href="#" className="text-sm text-sage-600">Edit</a>
              <a href="#" className="text-sm text-red-500">Delete</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
