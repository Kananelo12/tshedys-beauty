"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Edit, Trash2, Plus, Loader2, X, Save, AlertCircle } from 'lucide-react';

interface Service {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
}

interface ServiceFormData {
  name: string;
  description: string;
  price: string;
  category: string;
}

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingService, setDeletingService] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [error, setError] = useState('');

  const categories = [
    'Braids & Protective Styles',
    'Natural Hair Care',
    'Hair Extensions',
    'Treatments',
    'Makeup',
    'Other'
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.services) {
          setServices(data.services);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
        setLoading(false);
      });
  };

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: categories[0],
    });
    setError('');
    setShowModal(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || '',
      price: service.price.toString(),
      category: service.category,
    });
    setError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const url = editingService
        ? `/api/services/${editingService._id}`
        : '/api/services';
      
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save service');
      }

      await fetchServices();
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingService) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/services/${deletingService._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete service');
      }

      await fetchServices();
      setShowDeleteConfirm(false);
      setDeletingService(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (service: Service) => {
    setDeletingService(service);
    setShowDeleteConfirm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-foreground/30 animate-spin mx-auto mb-4" />
          <p className="text-sm text-foreground/40">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div {...fadeIn} transition={{ duration: 0.4 }}>
          <h2 className="text-2xl font-serif font-medium text-foreground tracking-[-0.025em]">
            Services
          </h2>
          <p className="text-sm text-foreground/40 mt-1">
            Manage your beauty services and pricing
          </p>
        </motion.div>
        
        <motion.button
          onClick={openCreateModal}
          {...fadeIn}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="px-5 py-2.5 rounded-xl bg-foreground text-white text-sm font-medium hover:bg-foreground/90 transition-all flex items-center gap-2"
        >
          <Plus size={16} />
          Add Service
        </motion.button>
      </div>

      {services.length === 0 ? (
        <motion.div
          {...fadeIn}
          className="bg-white border border-[#EEECEA] rounded-2xl p-12 text-center"
        >
          <Sparkles className="w-12 h-12 text-foreground/10 mx-auto mb-4" />
          <h3 className="text-base font-medium text-foreground mb-1">
            No services yet
          </h3>
          <p className="text-sm text-foreground/35 mb-6">
            Start by adding your first beauty service
          </p>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl bg-foreground text-white text-sm font-medium hover:bg-foreground/90 transition-all inline-flex items-center gap-2"
          >
            <Plus size={16} />
            Add Your First Service
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="bg-white border border-[#EEECEA] rounded-2xl p-5 hover:shadow-sm transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">
                    {service.name}
                  </h3>
                  <p className="text-xs text-foreground/35">
                    {service.category}
                  </p>
                  {service.description && (
                    <p className="text-xs text-foreground/30 mt-2 line-clamp-2">
                      {service.description}
                    </p>
                  )}
                  <div className="mt-3">
                    <span className="text-sm font-semibold text-foreground">
                      M{service.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEditModal(service)}
                    className="p-2 bg-[#F5F4F2] hover:bg-[#EEECEA] rounded-lg text-foreground/50 transition-all"
                    title="Edit service"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => confirmDelete(service)}
                    className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 transition-all"
                    title="Delete service"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.97, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-[#EEECEA] rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-serif font-medium text-foreground">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-[#F5F4F2] rounded-lg transition-colors"
                >
                  <X size={18} className="text-foreground/40" />
                </button>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground/35 uppercase tracking-wider mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEECEA] bg-[#F5F4F2]/50 focus:border-foreground/30 focus:outline-none text-sm transition-colors"
                    placeholder="e.g., Box Braids"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/35 uppercase tracking-wider mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEECEA] bg-[#F5F4F2]/50 focus:border-foreground/30 focus:outline-none text-sm transition-colors resize-none"
                    placeholder="Brief description of the service"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/35 uppercase tracking-wider mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEECEA] bg-[#F5F4F2]/50 focus:border-foreground/30 focus:outline-none text-sm transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/35 uppercase tracking-wider mb-2">
                    Price (M) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEECEA] bg-[#F5F4F2]/50 focus:border-foreground/30 focus:outline-none text-sm transition-colors"
                    placeholder="0.00"
                  />
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className="flex-1 px-5 py-2.5 rounded-xl border border-[#EEECEA] text-foreground/60 text-sm font-medium hover:bg-[#F5F4F2] transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-5 py-2.5 rounded-xl bg-foreground text-white text-sm font-medium hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        {editingService ? 'Update' : 'Create'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && deletingService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.97, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-red-200 rounded-2xl p-6 max-w-md w-full shadow-xl"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="text-red-500" size={24} />
                </div>
                <h3 className="text-lg font-serif font-medium text-foreground mb-1">
                  Delete Service?
                </h3>
                <p className="text-sm text-foreground/40">
                  Are you sure you want to delete <strong className="text-foreground">{deletingService.name}</strong>? This action cannot be undone.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={submitting}
                  className="flex-1 px-5 py-2.5 rounded-xl border border-[#EEECEA] text-foreground/60 text-sm font-medium hover:bg-[#F5F4F2] transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={submitting}
                  className="flex-1 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
