'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Service {
  _id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

export default function BookingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [isHouseCall, setIsHouseCall] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data.services));
  }, []);

  useEffect(() => {
    if (selectedService && selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      fetch(`/api/availability?date=${dateStr}&serviceId=${selectedService}`)
        .then(res => res.json())
        .then(data => setAvailableTimes(data.slots));
    } else {
      setAvailableTimes([]);
    }
  }, [selectedService, selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) {
      setError('Please select service, date, and time');
      return;
    }

    setLoading(true);
    setError('');

    const dateStr = selectedDate.toISOString().split('T')[0];

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      } else {
        const data = await res.json();
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to submit booking');
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

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center px-4 bg-cream-50">
          <div className="max-w-2xl w-full text-center py-20">
            <div className="bg-white rounded-2xl p-12 border border-gray-200 card-elevated">
              <div className="w-20 h-20 bg-sage-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl font-serif font-medium text-gray-900 mb-4">
                Booking Submitted!
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Thank you, {formData.name}! Your booking request has been sent and is awaiting confirmation.
              </p>
              <p className="text-gray-600 text-sm mb-8">
                You will receive a WhatsApp message once your booking is confirmed or rejected.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.location.reload()}>
                  Book Another Appointment
                </Button>
                <Link href="/">
                  <Button variant="outline">
                    Return Home
                  </Button>
                </Link>
              </div>
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
      <main className="min-h-screen pt-20 bg-cream-50">
        {/* Header Section */}
        <section className="relative section-padding bg-gradient-to-br from-sage-50 to-cream-50">
          <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-serif font-medium text-gray-900 mb-6">
              Book Your Appointment
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Schedule your beauty treatment with us. Select your preferred service, date, and time.
            </p>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 card-elevated">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-medium text-gray-900 mb-4">Select Service</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service *</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-white text-gray-900"
                    >
                      <option value="">Choose a service...</option>
                      {services.map((service) => (
                        <option key={service._id} value={service._id}>{service.name} - M{service.price}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-medium text-gray-900 mb-4">Select Date</h2>
                  <div className="flex justify-center">
                    <Calendar
                      onChange={(value) => setSelectedDate(value as Date | null)}
                      value={selectedDate}
                      minDate={new Date()}
                      className="react-calendar"
                    />
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && selectedService && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif font-medium text-gray-900 mb-4">Select Time</h2>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2 border rounded-lg ${selectedTime === time ? 'bg-sage-600 text-white' : 'bg-white text-gray-900 border-gray-300'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* House Call */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-medium text-gray-900 mb-4">Service Type</h2>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="houseCall"
                      checked={isHouseCall}
                      onChange={(e) => setIsHouseCall(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="houseCall" className="text-gray-700">
                      House Call (+M100 + transport cost)
                    </label>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-medium text-gray-900 mb-4">Personal Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-white text-gray-900"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-white text-gray-900"
                        placeholder="+266 123 456 789"
                      />
                    </div>
                  </div>
                </div>

                {error && <p className="text-red-600">{error}</p>}

                {/* Submit Button */}
                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Booking Request'}
                  </Button>
                </div>

                <p className="text-sm text-gray-500 text-center">
                  By booking, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
