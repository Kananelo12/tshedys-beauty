"use client";

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Contact submitted', formData);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 bg-cream-50">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900">Get In Touch</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">Questions, bookings, or consultations — we’re here to help.</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-600 mb-6">Call, email, or visit us. We welcome walk-ins and scheduled appointments.</p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">📞</div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-sm text-gray-600">+27 123 456 789</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">📧</div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-gray-600">hello@glowhaven.com</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">📍</div>
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-gray-600">123 Beauty Street, Johannesburg</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-sage-600 rounded-full flex items-center justify-center mx-auto mb-4">✓</div>
                      <h3 className="text-2xl font-serif font-medium text-gray-900 mb-2">Message Sent</h3>
                      <p className="text-gray-600 mb-6">Thanks for reaching out. We’ll reply soon.</p>
                      <Button onClick={() => setSubmitted(false)}>Send Another</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input id="name" name="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-full border border-gray-200 px-4 py-3" />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input id="email" type="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-full border border-gray-200 px-4 py-3" />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                        <input id="subject" name="subject" value={formData.subject} onChange={handleChange} className="mt-1 block w-full rounded-full border border-gray-200 px-4 py-3" />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3" />
                      </div>

                      <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
