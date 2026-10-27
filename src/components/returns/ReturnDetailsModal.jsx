import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import { 
  AlertTriangle, 
  Building2, 
  Calendar, 
  Tag, 
  ClipboardList, 
  FileText,
  Truck,
  ArrowRight
} from 'lucide-react';

export default function ReturnDetailsModal({ 
  isOpen, 
  onClose, 
  returnItem, 
  onUpdateStatus,
  onEscalateToSupplier 
}) {
  if (!returnItem) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Return Case – ${returnItem.id}`}
      subtitle="Defective / Expired Product Quarantine Record"
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        {/* Top Status & Quick Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div>
            <span className="text-xs text-slate-400 font-medium">Record Status</span>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant={returnItem.status} size="lg">{returnItem.status}</Badge>
              <Badge variant={returnItem.issueType}>{returnItem.issueType}</Badge>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Update Status:
            </label>
            <select
              value={returnItem.status}
              onChange={(e) => onUpdateStatus && onUpdateStatus(returnItem.id, e.target.value)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white shadow-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value="Recorded">Recorded</option>
              <option value="Under Review">Under Review</option>
              <option value="Supplier Escalated">Supplier Escalated</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Product & Issue Details Grid */}
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <p className="text-xs text-slate-400 font-medium">Product Name</p>
            <p className="font-bold text-slate-900 mt-0.5">{returnItem.productName}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400 font-medium">Category</p>
            <p className="font-semibold text-slate-800 mt-0.5">{returnItem.category}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400 font-medium">Quantity Affected</p>
            <p className="font-bold text-rose-600 mt-0.5">{returnItem.quantity} units</p>
          </div>

          <div>
            <p className="text-xs text-slate-400 font-medium">Supplier</p>
            <p className="font-semibold text-slate-800 mt-0.5">{returnItem.supplierName}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400 font-medium">Date Identified</p>
            <p className="font-semibold text-slate-800 mt-0.5">{returnItem.dateIdentified}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400 font-medium">Expiry Date</p>
            <p className="font-semibold text-slate-800 mt-0.5">{returnItem.expiryDate || 'N/A'}</p>
          </div>
        </div>

        {/* Description & Action */}
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-3">
          <div>
            <p className="text-xs text-slate-400 font-medium">Requested Action by Chemist</p>
            <p className="font-bold text-sky-700 mt-0.5 text-sm">{returnItem.requestedAction}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400 font-medium">Inspection Notes & Description</p>
            <p className="text-xs text-slate-600 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
              {returnItem.description}
            </p>
          </div>
        </div>

        {/* Action Button: Escalate to Supplier */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {returnItem.status !== 'Supplier Escalated' && (
            <button
              onClick={() => {
                if (onEscalateToSupplier) onEscalateToSupplier(returnItem);
                onClose();
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Truck className="w-4 h-4" />
              <span>Escalate to Supplier Request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
