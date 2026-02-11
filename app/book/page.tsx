"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, Mail, Phone, User, Check } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Service {
  _id: string;
  name: string;
  duration: number;
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
        <main className="min-h-screen pt-24 pb-16 bg-pink-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg text-center">
              <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Booking Request Sent!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for booking with Tshedy Beauty. We&apos;ll confirm
                your appointment via email or WhatsApp shortly.
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition-colors duration-300"
              >
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
      <main className="min-h-screen pt-24 pb-16 bg-pink-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Book Your Appointment
            </h1>
            <p className="text-lg text-gray-600">
              Fill out the form below and we&apos;ll confirm your booking
              shortly
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  <User size={16} className="inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  <Phone size={16} className="inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder="+266 XXXX XXXX"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  <Mail size={16} className="inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Service Selection */}
              <div>
                <label
                  htmlFor="serviceId"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Service *
                </label>
                {servicesError && (
                  <div className="mb-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {servicesLoading
                      ? "Loading services..."
                      : "Select a service"}
                  </option>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name} - M{service.price} ({service.duration} min)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Preferred Date */}
                <div>
                  <label
                    htmlFor="preferredDate"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    <Calendar size={16} className="inline mr-2" />
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Preferred Time */}
                <div>
                  <label
                    htmlFor="preferredTime"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    <Clock size={16} className="inline mr-2" />
                    Preferred Time *
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors resize-none"
                  placeholder="Any special requests or preferences..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 text-lg"
              >
                {loading ? "Submitting..." : "Book Appointment"}
              </button>

              <p className="text-center text-sm text-gray-500">
                By submitting, you agree to receive booking confirmations via
                email or WhatsApp
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
