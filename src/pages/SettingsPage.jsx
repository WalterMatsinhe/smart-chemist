import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Coins, 
  Bell, 
  Moon, 
  Sun, 
  Save, 
  RotateCcw,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function SettingsPage({ 
  settings, 
  onSaveSettings, 
  onResetDefaults 
}) {
  const [formData, setFormData] = useState(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
          System & Pharmacy Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure business details, prototype notifications, and regional currency settings.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Settings successfully updated in temporary React state.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Pharmacy Information */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-slate-800 text-base">Chemist Business Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Chemist Name
              </label>
              <input
                type="text"
                value={formData.chemistName}
                onChange={(e) => setFormData({ ...formData, chemistName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Business Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Phone Number
              </label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Operating Currency
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.currency}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-mono font-bold text-xs cursor-not-allowed"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-semibold">
                  Fixed to KES
                </span>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Physical Location / Address
              </label>
              <input
                type="text"
                value={formData.businessLocation}
                onChange={(e) => setFormData({ ...formData, businessLocation: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Preferences & Toggles */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Bell className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-slate-800 text-base">Alerts & Preferences</h3>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {/* Notification Toggle */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800">System Notification Badges</p>
                <p className="text-xs text-slate-400">Show indicators for pending orders and return actions</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notificationsEnabled}
                  onChange={(e) => setFormData({ ...formData, notificationsEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
              </label>
            </div>

            {/* Dark Mode Toggle */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800">Interface Dark Theme Simulation</p>
                <p className="text-xs text-slate-400">Toggle dark workspace contrast</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.darkMode}
                  onChange={(e) => setFormData({ ...formData, darkMode: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onResetDefaults}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default Mock Data</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-sky-600/20 flex items-center gap-2 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* Academic Project Credits & Context Box */}
      <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50/60 to-indigo-50/30 p-5 sm:p-6 text-slate-700 space-y-3">
        <div className="flex items-center gap-2.5 text-sky-800">
          <GraduationCap className="w-6 h-6 text-sky-700" />
          <h4 className="font-bold text-sm sm:text-base">
            Community Service Learning (CSL) Project Information
          </h4>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>School of Science and Technology</strong> – Practical Software Engineering Demonstration.
          This web application was engineered as an educational prototype to demonstrate a dual-function system: customer online ordering and pharmacy staff product-return recording with supplier escalation tracking.
        </p>
        <div className="text-[11px] text-slate-500 pt-2 border-t border-sky-100 flex flex-wrap items-center justify-between gap-2">
          <span>Authorised Prototype • Version 1.0</span>
          <span className="font-mono">React 18 • Vite • Tailwind CSS</span>
        </div>
      </div>
    </div>
  );
}
