"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, Mail, Phone, User, Check, ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Service {
  _id: string;
  name: string;
  price: number;
  description: string;
}

// Provider availability schedule (0=Sunday, 1=Monday, ..., 6=Saturday)
// null = fully unavailable, otherwise array of available hour ranges
const AVAILABILITY: Record<number, { start: number; end: number }[] | null> = {
  0: [{ start: 9, end: 17 }],   // Sunday: by appointment
  1: [{ start: 8, end: 20 }],   // Monday: all day
  2: null,                        // Tuesday: not available
  3: [{ start: 8, end: 20 }],   // Wednesday: all day
  4: [{ start: 9, end: 20 }],   // Thursday: from 9 AM
  5: [{ start: 8, end: 11 }, { start: 15, end: 20 }], // Friday: before 11, after 3
  6: [{ start: 8, end: 20 }],   // Saturday: all day
};

const DAY_LABELS: Record<number, string> = {
  0: "Sunday (by appointment)",
  1: "Monday",
  2: "Tuesday (unavailable)",
  3: "Wednesday",
  4: "Thursday (from 9 AM)",
  5: "Friday (breaks 11 AM–3 PM)",
  6: "Saturday",
};

function isDayAvailable(date: Date): boolean {
  const day = date.getDay();
  return AVAILABILITY[day] !== null;
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <>
        <Navbar />
        <main className="min-h-screen pt-18 pb-16 bg-cream-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-pink-400" />
        </main>
        <Footer />
      </>
    }>
      <BookingPageContent />
    </Suspense>
  );
}

function BookingPageContent() {
  const searchParams = useSearchParams();
  const preselectedStyle = searchParams.get("style");

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState("");
  const [success, setSuccess] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");
  const [error, setError] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState("");

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

  // Pre-select service from gallery deep link
  useEffect(() => {
    if (preselectedStyle && services.length > 0 && !formData.serviceId) {
      const match = services.find(
        (s) => s.name.toLowerCase() === preselectedStyle.toLowerCase()
      );
      if (match) {
        setFormData((prev) => ({ ...prev, serviceId: match._id }));
      }
    }
  }, [preselectedStyle, services, formData.serviceId]);

  // Fetch available time slots when date changes
  const fetchSlots = useCallback(async (date: string) => {
    if (!date) {
      setAvailableSlots([]);
      return;
    }

    // Check if the selected day is available at all
    const selectedDate = new Date(date + "T12:00:00");
    if (!isDayAvailable(selectedDate)) {
      setAvailableSlots([]);
      setSlotsError("The provider is not available on this day. Please pick another date.");
      return;
    }

    setSlotsLoading(true);
    setSlotsError("");
    try {
      const res = await fetch(`/api/availability?date=${date}`);
      const data = await res.json();
      if (res.ok && data.slots) {
        setAvailableSlots(data.slots);
        if (data.slots.length === 0) {
          setSlotsError("No available time slots for this date. Please try another day.");
        }
      } else {
        setSlotsError("Could not load available times. Please try again.");
        setAvailableSlots([]);
      }
    } catch {
      setSlotsError("Could not load available times. Please try again.");
      setAvailableSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Clear selected time when date changes
    setFormData((prev) => ({ ...prev, preferredTime: "" }));
    fetchSlots(formData.preferredDate);
  }, [formData.preferredDate, fetchSlots]);

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
        if (data.whatsappLink) setWhatsappLink(data.whatsappLink);
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
    const { name, value } = e.target;

    // Validate date selection — block unavailable days
    if (name === "preferredDate" && value) {
      const selected = new Date(value + "T12:00:00");
      if (!isDayAvailable(selected)) {
        setError("The provider is not available on Tuesdays. Please choose another day.");
        return;
      }
      setError("");
    }

    setFormData({ ...formData, [name]: value });
  };

  // Get the day info hint for the currently selected date
  const getSelectedDayHint = (): string | null => {
    if (!formData.preferredDate) return null;
    const selected = new Date(formData.preferredDate + "T12:00:00");
    const day = selected.getDay();
    return DAY_LABELS[day] || null;
  };

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
              <div className="flex flex-col items-center gap-3">
                {whatsappLink && (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-full hover:bg-[#1DA851] transition-colors w-full sm:w-auto justify-center"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Notify via WhatsApp
                  </a>
                )}
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Home
                </Link>
              </div>
              {whatsappLink && (
                <p className="text-xs text-gray-400 mt-4">
                  For a faster response, tap the WhatsApp button to send your booking details directly.
                </p>
              )}
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
                  {formData.preferredDate && (
                    <p className={`mt-1 text-xs ${
                      !isDayAvailable(new Date(formData.preferredDate + "T12:00:00"))
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}>
                      {getSelectedDayHint()}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Clock size={14} className="inline mr-1.5 text-gray-400" />
                    Time
                  </label>
                  {slotsLoading ? (
                    <div className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-400">
                      <Loader2 size={14} className="animate-spin" />
                      Loading available times...
                    </div>
                  ) : (
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                      disabled={!formData.preferredDate || availableSlots.length === 0}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {!formData.preferredDate
                          ? "Select a date first"
                          : availableSlots.length === 0
                            ? "No available slots"
                            : "Select time"}
                      </option>
                      {availableSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  )}
                  {slotsError && (
                    <p className="mt-1 text-xs text-red-500">{slotsError}</p>
                  )}
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

