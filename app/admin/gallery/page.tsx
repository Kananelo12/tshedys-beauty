"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, Upload, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, we'll use the existing public images
    // In the future, this should fetch from a database or storage API
    const existingImages = [
      '/CHRISTMAS Lunch 23189CC.JPG',
      '/CHRISTMAS Lunch 23208CV.JPG',
      '/CHRISTMAS Lunch 232136B.JPG',
      '/CHRISTMAS Lunch 23218DF.JPG',
      '/CHRISTMAS Lunch 23219DG.JPG',
      '/CHRISTMAS Lunch 23221DI.JPG',
      '/CHRISTMAS Lunch 23225DM.JPG',
      '/CHRISTMAS Lunch 23226DN.JPG'
    ];
    
    // Simulate loading
    setTimeout(() => {
      setImages(existingImages);
      setLoading(false);
    }, 500);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement actual file upload to storage
    console.log('File upload:', e.target.files);
  };

  const handleDelete = (imageSrc: string) => {
    // TODO: Implement actual image deletion
    setImages(images.filter(img => img !== imageSrc));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-serif font-bold bg-linear-to-r from-pink-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
            <ImageIcon className="text-pink-500" size={32} />
            Gallery
          </h2>
          <p className="text-gray-600 mt-2">
            Showcase your beautiful work
          </p>
        </motion.div>
        
        <motion.label
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-full bg-linear-to-r from-pink-500 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
          <Upload size={20} />
          Upload Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </motion.label>
      </div>

      {images.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass border-2 border-pink-200 rounded-2xl p-12 text-center"
        >
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No images yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start building your gallery by uploading your first images
          </p>
          <label className="px-6 py-3 rounded-full bg-linear-to-r from-pink-500 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 cursor-pointer">
            <Upload size={20} />
            Upload Your First Image
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass border-2 border-pink-200 rounded-2xl p-6"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="relative group rounded-xl overflow-hidden bg-cream-50 border-2 border-pink-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square relative">
                  <Image
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(src)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="glass border-2 border-pink-200 rounded-xl p-4">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> Gallery images are currently stored in the public folder. 
          Upload functionality will be connected to cloud storage in a future update.
        </p>
      </div>
    </div>
  );
}
