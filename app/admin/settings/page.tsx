"use client";

import { useState } from 'react';

export default function AdminSettingsPage() {
  const [appearance, setAppearance] = useState('light');

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-serif font-medium text-gray-900">Settings</h2>

      <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
        <div>
          <h3 className="font-medium">General</h3>
          <p className="text-sm text-gray-500">Business name, contact and timezone.</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Appearance</p>
            <p className="text-sm text-gray-500">Toggle theme and brand accents.</p>
          </div>
          <div className="flex items-center gap-2">
            <select value={appearance} onChange={(e) => setAppearance(e.target.value)} className="rounded-full border border-gray-200 px-3 py-2 text-sm">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        <div>
          <h3 className="font-medium">Integrations</h3>
          <p className="text-sm text-gray-500">Payment and calendar integrations.</p>
        </div>
      </div>
    </div>
  );
}
