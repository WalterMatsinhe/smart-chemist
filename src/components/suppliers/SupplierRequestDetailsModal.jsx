import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import { 
  Truck, 
  Building2, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  Mail, 
  ShieldAlert,
  Hash
} from 'lucide-react';

export default function SupplierRequestDetailsModal({ 
  isOpen, 
  onClose, 
  request, 
  onUpdateStatus 
}) {
  if (!request) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Supplier Request – ${request.id}`}
      subtitle="Wholesaler Claim, Credit Note, or Replacement Tracking"
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        {/* Policy Warning Banner */}
        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 flex items-start gap-2.5 text-xs">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold">Notice:</strong> Supplier approval is subject to manufacturer terms and not guaranteed by Smart Chemist.
          </p>
        </div>

        {/* Status update header */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div>
            <span className="text-xs text-slate-400 font-medium">Current Status</span>
            <div className="mt-1">
              <Badge variant={request.status} size="lg">{request.status}</Badge>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Update Request Status:
            </label>
            <select
              value={request.status}
              onChange={(e) => onUpdateStatus && onUpdateStatus(request.id, e.target.value)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white shadow-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Claim Details */}
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <p className="text-xs text-slate-400">Supplier Name</p>
            <p className="font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              {request.supplierName}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Request Type</p>
            <p className="font-semibold text-sky-700 mt-0.5">{request.requestType}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Product</p>
            <p className="font-semibold text-slate-800 mt-0.5">{request.product}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Quantity Claimed</p>
            <p className="font-bold text-slate-800 mt-0.5">{request.quantity} units</p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Date Submitted</p>
            <p className="font-semibold text-slate-800 mt-0.5">{request.dateSubmitted}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Internal Return Ref</p>
            <p className="font-mono text-slate-700 mt-0.5">{request.returnReferenceId || 'Direct'}</p>
          </div>
        </div>

        {/* Notes & Contact */}
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-3">
          <div>
            <p className="text-xs text-slate-400 font-medium">Claim Log Notes:</p>
            <p className="text-xs text-slate-600 mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              {request.notes || 'No additional notes logged.'}
            </p>
          </div>

          {request.contactEmail && (
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Supplier Contact: <span className="font-mono text-slate-700">{request.contactEmail}</span></span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
