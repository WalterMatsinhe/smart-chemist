import React, { useState } from 'react';
import Modal from '../common/Modal';
import { SUPPLIERS_LIST } from '../../data/mockData';
import { Truck, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function NewSupplierRequestModal({ isOpen, onClose, onAddRequest, initialData = null }) {
  const [formData, setFormData] = useState({
    supplierName: initialData?.supplierName || SUPPLIERS_LIST[0] || 'Cosmos Pharmaceuticals',
    product: initialData?.productName || '',
    quantity: initialData?.quantity || 1,
    requestType: 'Batch Replacement',
    dateSubmitted: new Date().toISOString().split('T')[0],
    status: 'Submitted',
    returnReferenceId: initialData?.id || '',
    notes: initialData?.description ? `Based on Return ${initialData.id}: ${initialData.description}` : '',
    contactEmail: ''
  });

  const [errors, setErrors] = useState({});

  const requestTypes = [
    'Batch Replacement',
    'Credit Note',
    'Physical Return',
    'Investigation & Quality Audit'
  ];

  const validate = () => {
    const errs = {};
    if (!formData.product.trim()) errs.product = 'Product name is required';
    if (!formData.quantity || Number(formData.quantity) <= 0) errs.quantity = 'Quantity must be greater than 0';
    if (!formData.supplierName) errs.supplierName = 'Supplier is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newRequest = {
      id: `SR-${Math.floor(500 + Math.random() * 500)}`,
      supplierName: formData.supplierName,
      product: formData.product.trim(),
      quantity: Number(formData.quantity),
      requestType: formData.requestType,
      dateSubmitted: formData.dateSubmitted,
      status: formData.status,
      returnReferenceId: formData.returnReferenceId || 'DIRECT-LOG',
      notes: formData.notes.trim() || 'Official chemist RMA submission.',
      contactEmail: formData.contactEmail || `claims@${formData.supplierName.toLowerCase().replace(/[^a-z0-9]/g, '')}.co.ke`
    };

    onAddRequest(newRequest);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Supplier Request"
      subtitle="Formal return, credit note, or batch replacement filing"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        {/* Critical Disclaimer Alert */}
        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Supplier Policy Notice:</span> Supplier approval is <span className="underline font-semibold">not guaranteed</span>. All claims, credit notes, or product replacements depend strictly on individual supplier warranties, return timeframes, and batch inspection criteria.
          </div>
        </div>

        {/* Supplier & Request Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Supplier Name <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.supplierName}
              onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              {SUPPLIERS_LIST.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Request Type <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.requestType}
              onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              {requestTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Product & Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Product Description <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Paracetamol 500mg (Batch PR-2024)"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className={`w-full px-3 py-2 rounded-xl border ${
                errors.product ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              } focus:ring-2 focus:ring-sky-500 focus:outline-none`}
            />
            {errors.product && <p className="text-rose-500 text-[11px] mt-1">{errors.product}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Quantity <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className={`w-full px-3 py-2 rounded-xl border ${
                errors.quantity ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              } focus:ring-2 focus:ring-sky-500 focus:outline-none`}
            />
            {errors.quantity && <p className="text-rose-500 text-[11px] mt-1">{errors.quantity}</p>}
          </div>
        </div>

        {/* Return Reference & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Return Reference ID (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. RET-201"
              value={formData.returnReferenceId}
              onChange={(e) => setFormData({ ...formData, returnReferenceId: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Initial Request Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Claim Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Claim Notes / Commercial Details
          </label>
          <textarea
            rows="3"
            placeholder="Include delivery invoice number, batch codes, or specific agreement details..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-sm transition-all"
          >
            Submit Supplier Request
          </button>
        </div>
      </form>
    </Modal>
  );
}
