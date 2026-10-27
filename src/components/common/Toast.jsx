import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const typeConfig = {
    success: {
      bg: 'bg-emerald-600 text-white',
      icon: CheckCircle2,
      border: 'border-emerald-500'
    },
    error: {
      bg: 'bg-rose-600 text-white',
      icon: AlertCircle,
      border: 'border-rose-500'
    },
    warning: {
      bg: 'bg-amber-500 text-white',
      icon: AlertCircle,
      border: 'border-amber-400'
    },
    info: {
      bg: 'bg-sky-600 text-white',
      icon: Info,
      border: 'border-sky-500'
    }
  };

  const config = typeConfig[type] || typeConfig.success;
  const Icon = config.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl ${config.bg} border ${config.border} text-white`}>
        <Icon className="w-5 h-5 shrink-0" />
        <p className="text-sm font-medium tracking-wide flex-1">{message}</p>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/20 transition-colors text-white"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
