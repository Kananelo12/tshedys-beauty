"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar as CalendarIcon,
  Home,
  MapPin,
  User,
  Mail,
  Phone,
  Check,
  Sparkles,
  Heart,
  Crown,
  Star,
  Clock,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Confetti from "react-confetti";

interface Service {
  _id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

// Step 1: Service Selection
function Step1ServiceSelection({
  services,
  selectedService,
  setSelectedService,
}: {
  services: Service[];
  selectedService: string;
  setSelectedService: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-serif font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Pick Your Perfect Treatment 👑
        </h2>
        <p className="text-charcoal-600">
          Choose the service that makes your heart flutter!
        </p>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        {services.map((service) => (
          <motion.button
            key={service._id}
            onClick={() => setSelectedService(service._id)}
            className={`min-w-70 md:min-w-[320px] p-6 rounded-3xl text-left transition-all relative overflow-hidden snap-center shrink-0 ${
              selectedService === service._id
                ? "bg-linear-to-br from-pink-100 to-purple-100 border-3 border-pink-400 shadow-xl"
                : "bg-white border-2 border-pink-200 hover:border-pink-300"
            }`}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            {selectedService === service._id && (
              <motion.div
                className="absolute inset-0 bg-linear-to-br from-pink-400/20 to-purple-400/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className="w-16 h-16 relative">
                  <Image 
                    src="/flower.png" 
                    alt="Service icon" 
                    width={64} 
                    height={64}
                    className="object-contain"
                  />
                </div>
                {selectedService === service._id && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {service.description}
              </p>

              <div className="flex items-center justify-end">
                <span className="text-lg font-bold text-pink-600">
                  M{service.price}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
        </div>
        
        {/* Scroll indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {services.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-pink-200"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Step 2: Date & Time Selection
function Step2DateTimeSelection({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  availableTimes,
  isHouseCall,
  setIsHouseCall,
}: {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  availableTimes: string[];
  isHouseCall: boolean;
  setIsHouseCall: (value: boolean) => void;
}) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const isDateDisabled = (day: number | null) => {
    if (!day) return true;
    const date = new Date(currentYear, currentMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSameDate = (day: number | null) => {
    if (!day || !selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-serif font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
          When Should We Pamper You? 📅
        </h2>
        <p className="text-charcoal-600">
          Pick a date that works with your fabulous schedule!
        </p>
      </div>

      {/* Custom Calendar */}
      <div className="bg-linear-to-br from-pink-50 to-purple-50 rounded-3xl p-6 mb-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
              } else {
                setCurrentMonth(currentMonth - 1);
              }
            }}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-2xl">←</span>
          </motion.button>

          <h3 className="text-2xl font-bold text-gray-900">
            {months[currentMonth]} {currentYear}
          </h3>

          <motion.button
            onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
              } else {
                setCurrentMonth(currentMonth + 1);
              }
            }}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-2xl">→</span>
          </motion.button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {generateCalendarDays().map((day, index) => (
            <motion.button
              key={index}
              onClick={() => {
                if (day && !isDateDisabled(day)) {
                  setSelectedDate(new Date(currentYear, currentMonth, day));
                }
              }}
              disabled={isDateDisabled(day)}
              className={`aspect-square rounded-2xl flex items-center justify-center font-semibold transition-all relative ${
                !day
                  ? "invisible"
                  : isDateDisabled(day)
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : isSameDate(day)
                      ? "bg-linear-to-br from-pink-500 to-purple-500 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-pink-100 hover:scale-110"
              }`}
              whileHover={!isDateDisabled(day) ? { scale: 1.1, y: -2 } : {}}
              whileTap={!isDateDisabled(day) ? { scale: 0.95 } : {}}
            >
              {day}
              {isSameDate(day) && (
                <motion.span
                  className="absolute -top-1 -right-1 text-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                >
                  ⭐
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && availableTimes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-pink-500" />
            Choose Your Time Slot
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {availableTimes.map((time) => (
              <motion.button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3 px-4 rounded-2xl font-semibold transition-all ${
                  selectedTime === time
                    ? "bg-linear-to-br from-pink-500 to-purple-500 text-white shadow-lg"
                    : "bg-white border-2 border-pink-200 text-gray-700 hover:border-pink-400"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {time}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* House Call Option */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={() => setIsHouseCall(false)}
          className={`p-6 rounded-3xl text-left transition-all relative overflow-hidden ${
            !isHouseCall
              ? "bg-linear-to-br from-pink-100 to-purple-100 border-3 border-pink-400 shadow-xl"
              : "bg-white border-2 border-pink-200"
          }`}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-4xl">🏠</span>
            {!isHouseCall && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Salon Visit</h4>
          <p className="text-sm text-gray-600">Come to our cozy salon space</p>
        </motion.button>

        <motion.button
          onClick={() => setIsHouseCall(true)}
          className={`p-6 rounded-3xl text-left transition-all relative overflow-hidden ${
            isHouseCall
              ? "bg-linear-to-br from-pink-100 to-purple-100 border-3 border-pink-400 shadow-xl"
              : "bg-white border-2 border-pink-200"
          }`}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-4xl">🚗</span>
            {isHouseCall && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">House Call</h4>
          <p className="text-sm text-gray-600">
            We come to you! +M100 + transport
          </p>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// Step 3: Personal Information
function Step3PersonalInfo({
  formData,
  handleChange,
}: {
  formData: { name: string; email: string; phone: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-serif font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Tell Us About Yourself! 💕
        </h2>
        <p className="text-charcoal-600">
          Just a few details so we can keep in touch!
        </p>
      </div>

      <div className="space-y-6">
        {/* Name Field */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
            <User className="w-4 h-4 text-pink-500" />
            Your Beautiful Name *
          </label>
          <motion.input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="What should we call you?"
            className="w-full px-6 py-4 bg-white border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-200 transition-all text-gray-900 placeholder:text-gray-400"
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
            <Mail className="w-4 h-4 text-pink-500" />
            Email Address *
          </label>
          <motion.input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="w-full px-6 py-4 bg-white border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-200 transition-all text-gray-900 placeholder:text-gray-400"
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>

        {/* Phone Field */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
            <Phone className="w-4 h-4 text-pink-500" />
            WhatsApp Number *
          </label>
          <motion.input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+266 123 456 789"
            className="w-full px-6 py-4 bg-white border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-200 transition-all text-gray-900 placeholder:text-gray-400"
            whileFocus={{ scale: 1.02 }}
          />
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            We&apos;ll send you booking confirmations here!
          </p>
        </motion.div>

        {/* Decorative Element */}
        <motion.div
          className="bg-linear-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mt-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-center text-sm text-gray-600 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-300" />
            Your information is safe with us and will only be used for booking
            purposes
            <Heart className="w-4 h-4 text-pink-500 fill-pink-300" />
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Step 4: Confirmation
function Step4Confirmation({
  services,
  selectedService,
  selectedDate,
  selectedTime,
  isHouseCall,
  formData,
}: {
  services: Service[];
  selectedService: string;
  selectedDate: Date | null;
  selectedTime: string;
  isHouseCall: boolean;
  formData: { name: string; email: string; phone: string };
}) {
  const service = services.find((s) => s._id === selectedService);

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-serif font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Almost There, Queen! 👑
        </h2>
        <p className="text-charcoal-600">
          Double-check your details before we seal the deal!
        </p>
      </div>

      <div className="space-y-4">
        {/* Service Summary */}
        <motion.div
          className="bg-linear-to-br from-pink-50 to-purple-50 rounded-3xl p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shrink-0">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Service</h3>
              <p className="text-gray-700">{service?.name}</p>
              <p className="text-sm text-pink-600 font-semibold mt-1">
                M{service?.price}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Date & Time Summary */}
        <motion.div
          className="bg-linear-to-br from-pink-50 to-purple-50 rounded-3xl p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shrink-0">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Date & Time</h3>
              <p className="text-gray-700">
                {selectedDate?.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-pink-600 font-semibold mt-1">{selectedTime}</p>
            </div>
          </div>
        </motion.div>

        {/* Location Summary */}
        <motion.div
          className="bg-linear-to-br from-pink-50 to-purple-50 rounded-3xl p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shrink-0">
              {isHouseCall ? (
                <MapPin className="w-6 h-6 text-white" />
              ) : (
                <Home className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Location</h3>
              <p className="text-gray-700">
                {isHouseCall ? "House Call Service" : "Salon Visit"}
              </p>
              {isHouseCall && (
                <p className="text-sm text-pink-600 font-semibold mt-1">
                  +M100 + transport cost
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Personal Info Summary */}
        <motion.div
          className="bg-linear-to-br from-pink-50 to-purple-50 rounded-3xl p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Your Details</h3>
              <p className="text-gray-700">{formData.name}</p>
              <p className="text-sm text-gray-600">{formData.email}</p>
              <p className="text-sm text-gray-600">{formData.phone}</p>
            </div>
          </div>
        </motion.div>

        {/* Final Note */}
        <motion.div
          className="bg-white border-2 border-pink-200 rounded-3xl p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-center text-sm text-gray-600 flex items-center justify-center gap-2 flex-wrap">
            <Star className="w-4 h-4 text-gold-500 fill-gold-400" />
            By confirming, you agree to our Terms of Service and Privacy Policy
            <Star className="w-4 h-4 text-gold-500 fill-gold-400" />
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [isHouseCall, setIsHouseCall] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data.services));
  }, []);

  useEffect(() => {
    if (selectedService && selectedDate) {
      // Format date in local timezone (not UTC) to prevent date shifts
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      fetch(`/api/availability?date=${dateStr}&serviceId=${selectedService}`)
        .then((res) => res.json())
        .then((data) => setAvailableTimes(data.slots));
    } else {
      setAvailableTimes([]);
    }
  }, [selectedService, selectedDate]);

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      setError("Please complete all steps");
      return;
    }

    setLoading(true);
    setError("");

    // Format date in local timezone (not UTC) to prevent date shifts
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService,
          clientName: formData.name,
          clientEmail: formData.email,
          clientPhone: formData.phone,
          date: dateStr,
          time: selectedTime,
          isHouseCall,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      } else {
        const data = await res.json();
        setError(data.error);
      }
    } catch {
      setError("Failed to submit booking");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    if (currentStep === 1 && !selectedService) {
      setError("Please select a service");
      return;
    }
    if (currentStep === 2 && (!selectedDate || !selectedTime)) {
      setError("Please select date and time");
      return;
    }
    if (
      currentStep === 3 &&
      (!formData.name || !formData.email || !formData.phone)
    ) {
      setError("Please fill in all personal details");
      return;
    }
    setError("");
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <Crown className="w-5 h-5" />;
      case 2:
        return <CalendarIcon className="w-5 h-5" />;
      case 3:
        return <User className="w-5 h-5" />;
      case 4:
        return <Check className="w-5 h-5" />;
      default:
        return null;
    }
  };

  // Success State with Celebration
  if (submitted) {
    return (
      <>
        <Navbar />
        {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
        <main className="min-h-screen pt-20 flex items-center justify-center px-4 bg-linear-to-br from-pink-50 via-purple-50 to-peach-50 relative overflow-hidden">
          {/* Floating Background Elements */}
          <motion.div
            className="absolute top-20 left-10 text-pink-300 text-6xl"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-20 text-purple-300 text-6xl"
            animate={{
              y: [0, 30, 0],
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💖
          </motion.div>
          <motion.div
            className="absolute top-40 right-40 text-gold-400 text-5xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ⭐
          </motion.div>

          <motion.div
            className="max-w-2xl w-full text-center py-12 relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <div className="glass border-3 border-pink-200 rounded-3xl p-12 relative overflow-hidden">
              {/* Success Icon with Animation */}
              <motion.div
                className="w-24 h-24 bg-linear-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Check className="w-12 h-12 text-white" strokeWidth={3} />
                </motion.div>
              </motion.div>

              {/* Animated Heading */}
              <motion.h2
                className="text-4xl md:text-5xl font-serif font-bold bg-linear-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Yay! You&apos;re All Set! 💕
              </motion.h2>

              <motion.p
                className="text-lg text-charcoal-600 mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Thank you,{" "}
                <span className="font-bold text-pink-600">{formData.name}</span>
                ! Your booking request has been received and we can&apos;t wait to
                pamper you! ✨
              </motion.p>

              <motion.div
                className="bg-linear-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-charcoal-600 text-sm flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  You&apos;ll receive a WhatsApp message once your booking is
                  confirmed
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-300" />
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-linear-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Another Appointment 💅
                </motion.button>
                <Link href="/">
                  <motion.button
                    className="px-8 py-4 bg-white border-2 border-pink-300 text-pink-600 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Return Home 🏠
                  </motion.button>
                </Link>
              </motion.div>

              {/* Decorative Sparkles */}
              <motion.div
                className="absolute -top-4 -right-4 text-4xl"
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ⭐
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 text-4xl"
                animate={{ rotate: [360, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                💖
              </motion.div>
            </div>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-linear-to-br from-pink-50 via-purple-50 to-peach-50 relative overflow-hidden">
        {/* Floating Background Animations */}
        <motion.div
          className="absolute top-40 left-20 text-pink-200 text-8xl opacity-30"
          animate={{
            y: [0, -40, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute bottom-40 right-20 text-purple-200 text-8xl opacity-30"
          animate={{
            y: [0, 40, 0],
            rotate: [360, 180, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💕
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/4 text-gold-200 text-6xl opacity-20"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ⭐
        </motion.div>

        {/* Header Section */}
        <section className="relative section-padding">
          <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold bg-linear-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-6">
                Let&apos;s Make You Gorgeous! 💖
              </h1>
              <p className="text-xl text-charcoal-600 max-w-3xl mx-auto">
                Your glow-up journey starts here – just a few clicks away from
                fabulous! ✨
              </p>
            </motion.div>
          </div>
        </section>

        {/* Progress Indicator */}
        <motion.div
          className="max-w-4xl mx-auto px-4 mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-pink-200 rounded-full -translate-y-1/2" />
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-linear-to-r from-pink-500 to-purple-500 rounded-full -translate-y-1/2"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />

            {/* Step Bubbles */}
            {[1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentStep >= step
                    ? "bg-linear-to-br from-pink-500 to-purple-500 text-white shadow-lg"
                    : "bg-white text-gray-400 border-2 border-pink-200"
                }`}
                animate={
                  currentStep === step
                    ? {
                        scale: [1, 1.2, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 1,
                  repeat: currentStep === step ? Infinity : 0,
                }}
              >
                {getStepIcon(step)}
                {currentStep === step && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-pink-400"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="flex justify-between mt-4">
            {["Service", "Date & Time", "Your Info", "Confirm"].map(
              (label, index) => (
                <div key={index} className="w-16 text-center">
                  <p
                    className={`text-xs font-semibold ${currentStep >= index + 1 ? "text-pink-600" : "text-gray-400"}`}
                  >
                    {label}
                  </p>
                </div>
              ),
            )}
          </div>
        </motion.div>

        {/* Booking Form */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="glass border-3 border-pink-200 rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-150"
              layout
            >
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <Step1ServiceSelection
                    key="step1"
                    services={services}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                  />
                )}

                {currentStep === 2 && (
                  <Step2DateTimeSelection
                    key="step2"
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    availableTimes={availableTimes}
                    isHouseCall={isHouseCall}
                    setIsHouseCall={setIsHouseCall}
                  />
                )}

                {currentStep === 3 && (
                  <Step3PersonalInfo
                    key="step3"
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}

                {currentStep === 4 && (
                  <Step4Confirmation
                    key="step4"
                    services={services}
                    selectedService={selectedService}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    isHouseCall={isHouseCall}
                    formData={formData}
                  />
                )}
              </AnimatePresence>

              {/* Error Message */}
              {error && (
                <motion.div
                  className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-red-600 text-center font-semibold">
                    {error}
                  </p>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <motion.div
                className="flex gap-4 mt-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentStep > 1 && (
                  <motion.button
                    onClick={prevStep}
                    className="flex-1 px-8 py-4 bg-white border-2 border-pink-300 text-pink-600 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ← Back
                  </motion.button>
                )}

                {currentStep < 4 ? (
                  <motion.button
                    onClick={nextStep}
                    className="flex-1 px-8 py-4 bg-linear-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue →
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 px-8 py-4 bg-linear-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          ⭐
                        </motion.span>
                        Submitting...
                      </span>
                    ) : (
                      "✨ Confirm Booking"
                    )}
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
