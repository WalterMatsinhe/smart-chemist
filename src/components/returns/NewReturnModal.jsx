import React, { useState } from 'react';
import Modal from '../common/Modal';
import { SUPPLIERS_LIST, CATEGORIES_LIST } from '../../data/mockData';
import { AlertTriangle, PlusCircle, CheckCircle, HelpCircle } from 'lucide-react';

export default function NewReturnModal({ isOpen, onClose, onAddReturn, products = [] }) {
  const initialForm = {
    productName: '',
    category: 'Pain Relief',
    quantity: 1,
    issueType: 'Expired',
    dateIdentified: new Date().toISOString().split('T')[0],
    expiryDate: '',
    description: '',
    supplierName: SUPPLIERS_LIST[0] || 'Cosmos Pharmaceuticals',
    requestedAction: 'Return to supplier'
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const issueTypes = [
    'Expired',
    'Damaged packaging',
    'Wrong product',
    'Incorrect quantity',
    'Other'
  ];

  const requestedActions = [
    'Return to supplier',
    'Request replacement',
    'Request credit',
    'Review required'
  ];

  const handleProductSelect = (e) => {
    const selectedName = e.target.value;
    const matchedProduct = products.find(p => p.name === selectedName);
    if (matchedProduct) {
      setFormData(prev => ({
        ...prev,
        productName: matchedProduct.name,
        category: matchedProduct.category,
        supplierName: matchedProduct.supplier || prev.supplierName
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        productName: selectedName
      }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.productName.trim()) {
      errs.productName = 'Product name is required';
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      errs.quantity = 'Quantity must be greater than 0';
    }
    if (!formData.dateIdentified) {
      errs.dateIdentified = 'Date identified is required';
    }
    if (formData.issueType === 'Expired' && !formData.expiryDate) {
      errs.expiryDate = 'Expiry date is required for expired goods';
    }
    if (!formData.description.trim()) {
      errs.description = 'Please provide notes/description of the defect or issue';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newRecord = {
      id: `RET-${Math.floor(200 + Math.random() * 800)}`,
      productName: formData.productName.trim(),
      category: formData.category,
      quantity: Number(formData.quantity),
      issueType: formData.issueType,
      dateIdentified: formData.dateIdentified,
      expiryDate: formData.expiryDate || 'N/A',
      description: formData.description.trim(),
      supplierName: formData.supplierName,
      requestedAction: formData.requestedAction,
      status: 'Recorded'
    };

    onAddReturn(newRecord);
    setFormData(initialForm);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Expired or Damaged Product"
      subtitle="Authorized pharmacy staff inventory defect intake form"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        {/* Academic / Staff Notice */}
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 flex items-start gap-2.5 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Staff Defect Logging Notice:</span> All quarantined items must be kept in the secure rear inventory holding room until supplier inspection or verified return.
          </div>
        </div>

        {/* Product Selection & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Product Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                list="pharmacy-products"
                placeholder="Type or select product..."
                value={formData.productName}
                onChange={handleProductSelect}
                className={`w-full px-3 py-2 rounded-xl border ${
                  errors.productName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                } focus:ring-2 focus:ring-sky-500 focus:outline-none`}
              />
              <datalist id="pharmacy-products">
                {products.map(p => (
                  <option key={p.id} value={p.name} />
                ))}
              </datalist>
            </div>
            {errors.productName && <p className="text-rose-500 text-[11px] mt-1">{errors.productName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Product Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              {CATEGORIES_LIST.filter(c => c !== 'All Categories').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantity & Supplier */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Quantity Affected <span className="text-rose-500">*</span>
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

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Supplier Name <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.supplierName}
              onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              {SUPPLIERS_LIST.map(sup => (
                <option key={sup} value={sup}>{sup}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Issue Type & Requested Action */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Issue Type <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.issueType}
              onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              {issueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Requested Action <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.requestedAction}
              onChange={(e) => setFormData({ ...formData, requestedAction: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              {requestedActions.map(act => (
                <option key={act} value={act}>{act}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Date Identified <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dateIdentified}
              onChange={(e) => setFormData({ ...formData, dateIdentified: e.target.value })}
              className={`w-full px-3 py-2 rounded-xl border ${
                errors.dateIdentified ? 'border-rose-400' : 'border-slate-300'
              } focus:ring-2 focus:ring-sky-500 focus:outline-none`}
            />
            {errors.dateIdentified && <p className="text-rose-500 text-[11px] mt-1">{errors.dateIdentified}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Expiry Date {formData.issueType === 'Expired' && <span className="text-rose-500">*</span>}
            </label>
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className={`w-full px-3 py-2 rounded-xl border ${
                errors.expiryDate ? 'border-rose-400' : 'border-slate-300'
              } focus:ring-2 focus:ring-sky-500 focus:outline-none`}
            />
            {errors.expiryDate && <p className="text-rose-500 text-[11px] mt-1">{errors.expiryDate}</p>}
          </div>
        </div>

        {/* Description / Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Description or Defect Notes <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows="3"
            placeholder="Describe batch number, damage symptoms, or reason for return..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`w-full px-3 py-2 rounded-xl border ${
              errors.description ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
            } focus:ring-2 focus:ring-sky-500 focus:outline-none`}
          ></textarea>
          {errors.description && <p className="text-rose-500 text-[11px] mt-1">{errors.description}</p>}
        </div>

        {/* Buttons */}
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
            className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-sm shadow-sky-600/20 transition-all"
          >
            Log Product Return Case
          </button>
        </div>
      </form>
    </Modal>
  );
}
