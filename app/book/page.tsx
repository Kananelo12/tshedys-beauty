"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState("");
  const [success, setSuccess] = useState(false);
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
        <main className="min-h-screen pt-18 pb-16 bg-background flex items-center">
          <div className="max-w-lg mx-auto px-5 sm:px-8 w-full">
            <div className="bg-white rounded-2xl border border-cream-200 p-8 sm:p-10 text-center">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <Check className="w-7 h-7 text-green-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-medium text-foreground mb-3">
                Booking Sent!
              </h1>
              <p className="text-foreground/50 mb-8 text-sm leading-relaxed">
                Thank you for booking with Tshedy Beauty. We&apos;ll confirm
                your appointment via email shortly.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-white text-sm font-semibold rounded-full hover:bg-foreground/90 transition-all"
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
      <main className="min-h-screen pt-18 pb-16 bg-background">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-pink-500 mb-4">
              Book Now
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-4">
              Book Your Appointment
            </h1>
            <p className="text-foreground/50 text-sm">
              Fill out the form and we&apos;ll confirm your booking shortly
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-cream-200 p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Phone row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-foreground/70 mb-2 uppercase tracking-wide">
                    <User size={13} className="inline mr-1.5 text-foreground/30" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-cream-200 bg-cream-100/50 rounded-xl text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:bg-white focus:outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-foreground/70 mb-2 uppercase tracking-wide">
                    <Phone size={13} className="inline mr-1.5 text-foreground/30" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-cream-200 bg-cream-100/50 rounded-xl text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:bg-white focus:outline-none transition-all"
                    placeholder="+266 XXXX XXXX"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-foreground/70 mb-2 uppercase tracking-wide">
                  <Mail size={13} className="inline mr-1.5 text-foreground/30" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-cream-200 bg-cream-100/50 rounded-xl text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:bg-white focus:outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>

              {/* Service */}
              <div>
                <label htmlFor="serviceId" className="block text-xs font-semibold text-foreground/70 mb-2 uppercase tracking-wide">
                  Service
                </label>
                {servicesError && (
                  <div className="mb-2 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
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
                  className="w-full px-4 py-3 border border-cream-200 bg-cream-100/50 rounded-xl text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:bg-white focus:outline-none transition-all disabled:bg-cream-100 disabled:cursor-not-allowed"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="preferredDate" className="block text-xs font-semibold text-foreground/70 mb-2 uppercase tracking-wide">
                    <Calendar size={13} className="inline mr-1.5 text-foreground/30" />
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
                    className="w-full px-4 py-3 border border-cream-200 bg-cream-100/50 rounded-xl text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:bg-white focus:outline-none transition-all"
                  />
                  {formData.preferredDate && (
                    <p className={`mt-1.5 text-xs ${
                      !isDayAvailable(new Date(formData.preferredDate + "T12:00:00"))
                        ? "text-red-500"
                        : "text-foreground/35"
                    }`}>
                      {getSelectedDayHint()}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="preferredTime" className="block text-xs font-semibold text-foreground/70 mb-2 uppercase tracking-wide">
                    <Clock size={13} className="inline mr-1.5 text-foreground/30" />
                    Time
                  </label>
                  {slotsLoading ? (
                    <div className="flex items-center gap-2 px-4 py-3 border border-cream-200 rounded-xl text-sm text-foreground/35">
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
                      className="w-full px-4 py-3 border border-cream-200 bg-cream-100/50 rounded-xl text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:bg-white focus:outline-none transition-all disabled:bg-cream-100 disabled:cursor-not-allowed"
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
                    <p className="mt-1.5 text-xs text-red-500">{slotsError}</p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-xs font-semibold text-foreground/70 mb-2 uppercase tracking-wide">
                  Notes <span className="text-foreground/30 font-normal normal-case">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-cream-200 bg-cream-100/50 rounded-xl text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:bg-white focus:outline-none transition-all resize-none"
                  placeholder="Any special requests..."
                />
              </div>

              {/* Error */}
              {error && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-foreground text-white text-sm font-semibold rounded-full hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Submitting..." : "Book Appointment"}
              </button>

              <p className="text-center text-xs text-foreground/30">
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
