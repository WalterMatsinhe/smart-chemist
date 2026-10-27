import React from 'react';

export default function Badge({ children, variant = 'neutral', size = 'md' }) {
  const variantStyles = {
    // Order & Request Statuses
    pending: 'bg-amber-50 text-amber-700 border border-amber-200/80',
    confirmed: 'bg-sky-50 text-sky-700 border border-sky-200/80',
    completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    cancelled: 'bg-rose-50 text-rose-700 border border-rose-200/80',
    approved: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    rejected: 'bg-rose-50 text-rose-700 border border-rose-200/80',
    submitted: 'bg-blue-50 text-blue-700 border border-blue-200/80',
    draft: 'bg-slate-100 text-slate-600 border border-slate-200',

    // Stock
    in_stock: 'bg-emerald-50 text-emerald-700 border border-emerald-200/70',
    low_stock: 'bg-amber-50 text-amber-700 border border-amber-200/70',
    out_of_stock: 'bg-rose-50 text-rose-700 border border-rose-200/70',

    // Return Issue Types
    expired: 'bg-red-50 text-red-700 border border-red-200',
    damaged: 'bg-orange-50 text-orange-700 border border-orange-200',
    wrong_product: 'bg-purple-50 text-purple-700 border border-purple-200',
    incorrect_qty: 'bg-indigo-50 text-indigo-700 border border-indigo-200',

    // Generic
    primary: 'bg-sky-50 text-sky-700 border border-sky-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded-md font-medium',
    md: 'text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1.5',
    lg: 'text-sm px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-2',
  };

  // Normalize variant key
  const normalizedVariant = variant?.toString().toLowerCase().replace(/[\s-]+/g, '_');
  const style = variantStyles[normalizedVariant] || variantStyles.neutral;

  return (
    <span className={`${style} ${sizeStyles[size]} transition-colors tracking-wide`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      {children}
    </span>
  );
}
