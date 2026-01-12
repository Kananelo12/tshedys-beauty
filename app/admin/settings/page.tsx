'use client';

import { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';

export default function SettingsPage() {
  const [businessInfo, setBusinessInfo] = useState({
    name: "Tshedy's Beauty Parlour",
    email: 'info@tshedysbeauty.com',
    phone: '+27 123 456 789',
    address: '123 Beauty Street, Johannesburg, 2000',
    description: 'Experience luxury beauty treatments in a premium, welcoming atmosphere.',
  });

  const [hours, setHours] = useState({
    monday: { open: '09:00', close: '19:00', closed: false },
    tuesday: { open: '09:00', close: '19:00', closed: false },
    wednesday: { open: '09:00', close: '19:00', closed: false },
    thursday: { open: '09:00', close: '19:00', closed: false },
    friday: { open: '09:00', close: '19:00', closed: false },
    saturday: { open: '09:00', close: '18:00', closed: false },
    sunday: { open: '09:00', close: '17:00', closed: true },
  });

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-white">Settings</h2>
        <p className="text-gray-400 text-sm mt-1">Manage your business information and preferences</p>
      </div>

      {/* Business Information */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold text-gold-500 mb-6">Business Information</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Business Name *
            </label>
            <input
              type="text"
              value={businessInfo.name}
              onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
              className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={businessInfo.email}
                onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={businessInfo.phone}
                onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Business Address *
            </label>
            <input
              type="text"
              value={businessInfo.address}
              onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
              className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Business Description
            </label>
            <textarea
              rows={4}
              value={businessInfo.description}
              onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
              className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
            />
          </div>

          <Button>Save Changes</Button>
        </div>
      </Card>

      {/* Business Hours */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold text-gold-500 mb-6">Business Hours</h3>
        <div className="space-y-4">
          {Object.entries(hours).map(([day, times]) => (
            <div key={day} className="flex items-center gap-4">
              <div className="w-32">
                <span className="text-white font-medium capitalize">{day}</span>
              </div>
              <div className="flex items-center gap-4 flex-1">
                <input
                  type="time"
                  value={times.open}
                  disabled={times.closed}
                  onChange={(e) => setHours({
                    ...hours,
                    [day]: { ...times, open: e.target.value }
                  })}
                  className="px-4 py-2 bg-charcoal-800 border border-charcoal-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 disabled:opacity-50"
                />
                <span className="text-gray-400">to</span>
                <input
                  type="time"
                  value={times.close}
                  disabled={times.closed}
                  onChange={(e) => setHours({
                    ...hours,
                    [day]: { ...times, close: e.target.value }
                  })}
                  className="px-4 py-2 bg-charcoal-800 border border-charcoal-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 disabled:opacity-50"
                />
                <label className="flex items-center space-x-2 ml-4">
                  <input
                    type="checkbox"
                    checked={times.closed}
                    onChange={(e) => setHours({
                      ...hours,
                      [day]: { ...times, closed: e.target.checked }
                    })}
                    className="w-4 h-4 text-gold-500 bg-charcoal-800 border-charcoal-700 rounded focus:ring-gold-500"
                  />
                  <span className="text-sm text-gray-400">Closed</span>
                </label>
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-6">Save Hours</Button>
      </Card>

      {/* Social Media */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold text-gold-500 mb-6">Social Media Links</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Instagram
            </label>
            <input
              type="url"
              placeholder="https://instagram.com/tshedysbeauty"
              className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Facebook
            </label>
            <input
              type="url"
              placeholder="https://facebook.com/tshedysbeauty"
              className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              WhatsApp Number
            </label>
            <input
              type="tel"
              placeholder="+27 123 456 789"
              className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
        </div>
        <Button className="mt-6">Save Social Links</Button>
      </Card>

      {/* Notification Settings */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold text-gold-500 mb-6">Notification Preferences</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-charcoal-800 rounded-xl cursor-pointer hover:bg-charcoal-700 transition-colors">
            <div>
              <p className="text-white font-medium">New Booking Alerts</p>
              <p className="text-sm text-gray-400">Receive email when new bookings are made</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-gold-500 bg-charcoal-800 border-charcoal-700 rounded focus:ring-gold-500"
            />
          </label>
          <label className="flex items-center justify-between p-4 bg-charcoal-800 rounded-xl cursor-pointer hover:bg-charcoal-700 transition-colors">
            <div>
              <p className="text-white font-medium">Booking Reminders</p>
              <p className="text-sm text-gray-400">Get reminders for upcoming appointments</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-gold-500 bg-charcoal-800 border-charcoal-700 rounded focus:ring-gold-500"
            />
          </label>
          <label className="flex items-center justify-between p-4 bg-charcoal-800 rounded-xl cursor-pointer hover:bg-charcoal-700 transition-colors">
            <div>
              <p className="text-white font-medium">Customer Messages</p>
              <p className="text-sm text-gray-400">Notify when customers send inquiries</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-gold-500 bg-charcoal-800 border-charcoal-700 rounded focus:ring-gold-500"
            />
          </label>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-8 border-red-900">
        <h3 className="text-xl font-semibold text-red-500 mb-6">Danger Zone</h3>
        <div className="space-y-4">
          <div className="p-4 bg-red-950/30 border border-red-900 rounded-xl">
            <p className="text-white font-medium mb-2">Export All Data</p>
            <p className="text-sm text-gray-400 mb-4">Download all your business data including bookings, services, and customer information.</p>
            <Button variant="secondary" size="sm">Export Data</Button>
          </div>
          <div className="p-4 bg-red-950/30 border border-red-900 rounded-xl">
            <p className="text-white font-medium mb-2">Delete Account</p>
            <p className="text-sm text-gray-400 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
            <Button variant="secondary" size="sm" className="bg-red-900 hover:bg-red-800 text-white">
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
