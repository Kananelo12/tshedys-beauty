"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, Mail, Phone, User, Check, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Service {
  _id: string;
  name: string;
  price: number;
  description: string;
}

export default function BookingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceId: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  // Fetch services on mount
  useEffect(() => {
    setServicesLoading(true);
    fetch("/api/services")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Services fetched:", data);
        if (data.success && data.services) {
          setServices(data.services);
          if (data.services.length === 0) {
            setServicesError(
              "No services available. Please contact the salon.",
            );
          }
        } else {
          setServicesError("Failed to load services. Please try again later.");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch services:", err);
        setServicesError("Failed to load services. Please try again later.");
      })
      .finally(() => {
        setServicesLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: formData.serviceId,
          clientName: formData.name,
          clientEmail: formData.email,
          clientPhone: formData.phone,
          date: formData.preferredDate,
          time: formData.preferredTime,
          isHouseCall: false,
          notes: formData.notes,
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success || data.bookingId)) {
        setSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          serviceId: "",
          preferredDate: "",
          preferredTime: "",
          notes: "",
        });
      } else {
        setError(data.error || "Failed to submit booking");
      }
    } catch (err) {
      console.error("Error submitting booking:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Generate time slots
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 17) {
      timeSlots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }

  if (success) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-18 pb-16 bg-cream-50 flex items-center">
          <div className="max-w-lg mx-auto px-5 sm:px-6 w-full">
            <div className="bg-white rounded-xl border border-gray-100 p-8 sm:p-10 text-center">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <Check className="w-7 h-7 text-green-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-3">
                Booking Sent!
              </h1>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                Thank you for booking with Tshedy Beauty. We&apos;ll confirm
                your appointment via email shortly.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-18 pb-16 bg-cream-50">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-600 mb-3">
              Book Now
            </p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-3">
              Book Your Appointment
            </h1>
            <p className="text-gray-500 text-sm">
              Fill out the form and we&apos;ll confirm your booking shortly
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  <User size={14} className="inline mr-1.5 text-gray-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Phone size={14} className="inline mr-1.5 text-gray-400" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none transition-colors"
                  placeholder="+266 XXXX XXXX"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Mail size={14} className="inline mr-1.5 text-gray-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Service */}
              <div>
                <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Service
                </label>
                {servicesError && (
                  <div className="mb-2 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
                    {servicesError}
                  </div>
                )}
                <select
                  id="serviceId"
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  required
                  disabled={servicesLoading || services.length === 0}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {servicesLoading ? "Loading services..." : "Select a service"}
                  </option>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name} - M{service.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Calendar size={14} className="inline mr-1.5 text-gray-400" />
                    Date
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Clock size={14} className="inline mr-1.5 text-gray-400" />
                    Time
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none transition-colors"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none transition-colors resize-none"
                  placeholder="Any special requests..."
                />
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Submitting..." : "Book Appointment"}
              </button>

              <p className="text-center text-xs text-gray-400">
                By submitting, you agree to receive booking confirmations via
                email.
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
