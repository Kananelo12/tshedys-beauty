/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';

export default function ServicesManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const services = [
    { id: 1, title: 'Haircuts & Styling', price: 'R250', duration: '1 hour', category: 'Hair Styling', active: true },
    { id: 2, title: 'Hair Coloring', price: 'R500', duration: '2-3 hours', category: 'Hair Styling', active: true },
    { id: 3, title: 'Deep Conditioning Treatment', price: 'R350', duration: '1.5 hours', category: 'Treatments', active: true },
    { id: 4, title: 'Keratin Treatment', price: 'R800', duration: '2-3 hours', category: 'Treatments', active: true },
    { id: 5, title: 'Braiding', price: 'R400', duration: '3-5 hours', category: 'Braiding & Extensions', active: true },
    { id: 6, title: 'Weaves & Extensions', price: 'R600', duration: '3-4 hours', category: 'Braiding & Extensions', active: true },
    { id: 7, title: 'Natural Hair Care', price: 'R300', duration: '1.5-2 hours', category: 'Hair Styling', active: true },
    { id: 8, title: 'Bridal Hair & Makeup', price: 'R1500', duration: '3-4 hours', category: 'Special Occasions', active: false },
  ];

  const openModal = (service?: any) => {
    setEditingService(service || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Services Management</h2>
          <p className="text-gray-400 text-sm mt-1">Manage your service offerings and pricing</p>
        </div>
        <Button onClick={() => openModal()}>
          <span className="mr-2">➕</span> Add New Service
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-400 mb-1">Total Services</p>
          <p className="text-2xl font-bold text-white">{services.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-400 mb-1">Active</p>
          <p className="text-2xl font-bold text-green-400">
            {services.filter(s => s.active).length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-400 mb-1">Categories</p>
          <p className="text-2xl font-bold text-gold-500">4</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-400 mb-1">Avg. Price</p>
          <p className="text-2xl font-bold text-white">R550</p>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} hover className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{service.title}</h3>
                <span className="text-xs text-gray-500 bg-charcoal-800 px-2 py-1 rounded-full">
                  {service.category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${service.active ? 'bg-green-500' : 'bg-gray-500'}`}></span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Price</span>
                <span className="text-gold-500 font-semibold">{service.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Duration</span>
                <span className="text-gray-300">{service.duration}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-charcoal-800">
              <button
                onClick={() => openModal(service)}
                className="flex-1 px-4 py-2 bg-charcoal-800 text-gold-500 rounded-lg hover:bg-charcoal-700 transition-colors text-sm font-medium"
              >
                Edit
              </button>
              <button className="flex-1 px-4 py-2 bg-charcoal-800 text-red-500 rounded-lg hover:bg-charcoal-700 transition-colors text-sm font-medium">
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-charcoal-900 rounded-3xl border border-charcoal-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-script font-bold text-gold-500">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    defaultValue={editingService?.title}
                    placeholder="e.g., Hair Coloring"
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Price *
                    </label>
                    <input
                      type="text"
                      defaultValue={editingService?.price}
                      placeholder="e.g., R500"
                      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      defaultValue={editingService?.duration}
                      placeholder="e.g., 2-3 hours"
                      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    defaultValue={editingService?.category}
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none cursor-pointer"
                  >
                    <option value="">Select a category...</option>
                    <option value="Hair Styling">Hair Styling</option>
                    <option value="Treatments">Treatments</option>
                    <option value="Braiding & Extensions">Braiding & Extensions</option>
                    <option value="Special Occasions">Special Occasions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe the service..."
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="active"
                    defaultChecked={editingService?.active !== false}
                    className="w-4 h-4 text-gold-500 bg-charcoal-800 border-charcoal-700 rounded focus:ring-gold-500"
                  />
                  <label htmlFor="active" className="text-sm text-gray-300">
                    Active (visible to customers)
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" onClick={closeModal} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    {editingService ? 'Save Changes' : 'Add Service'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
