"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Check, Send } from "lucide-react";
import dynamic from "next/dynamic";

const BusinessMap = dynamic(() => import("@/app/components/BusinessMap"), {
  ssr: false,
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        "Failed to send message. Please try again or contact us directly.",
      );
      console.error("Contact form error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream-50">
      {/* Header */}
      <div className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-600 mb-3">
            Reach Out
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
            Get In Touch
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
            Questions, bookings, or consultations, we&apos;re here to help you
            look and feel amazing.
          </p>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="pb-14">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Left — Info */}
            <div>
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                Contact Information
              </h3>
              <p className="text-gray-500 text-sm mb-8">
                Call, email, or visit us. We welcome walk-ins and scheduled
                appointments.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="text-pink-500" size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Phone
                    </div>
                    <a
                      href="tel:+26658809665"
                      className="text-sm text-pink-600 hover:text-pink-700 transition-colors"
                    >
                      +266 58809665
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="text-pink-500" size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Email
                    </div>
                    <a
                      href="mailto:mamahlokomahloko818@gmail.com"
                      className="text-sm text-pink-600 hover:text-pink-700 break-all transition-colors"
                    >
                      mamahlokomahloko818@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="text-pink-500" size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Location
                    </div>
                    <div className="text-sm text-gray-500">
                      Room 4, Olympic Building
                      <br />
                      Maseru, Lesotho
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6 mt-6 border-t border-gray-100">
                <div className="text-sm font-medium text-gray-900 mb-3">
                  Follow Us
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/tshedys_beauty_parlour"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:border-pink-300 hover:text-pink-500 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@tshedysbeautyparlour"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:border-pink-300 hover:text-pink-500 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61581650923087"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:border-pink-300 hover:text-pink-500 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div>
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-100 shadow-soft">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="text-green-600" size={24} />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                      Message Sent
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Thanks for reaching out. We&apos;ll reply soon.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                        className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={loading}
                        className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        disabled={loading}
                        className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h3 className="text-xl font-serif font-semibold text-gray-900 mb-6 text-center">
            Find Us Here
          </h3>
          <div className="overflow-hidden rounded-xl border border-gray-100 shadow-soft">
            <BusinessMap />
          </div>
        </div>
      </div>
    </div>
  );
}
