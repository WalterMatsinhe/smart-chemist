import React, { useState } from 'react';
import { 
  Truck, 
  PlusCircle, 
  Search, 
  Filter, 
  AlertTriangle, 
  ShieldAlert, 
  Building2, 
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';

export default function SupplierRequestsPage({ 
  supplierRequests = [], 
  onAddRequest, 
  onUpdateStatus, 
  onViewRequestDetails,
  onOpenNewRequestModal 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [supplierFilter, setSupplierFilter] = useState('All');

  // Unique suppliers from requests
  const uniqueSuppliers = Array.from(new Set(supplierRequests.map(s => s.supplierName)));

  const filteredRequests = supplierRequests.filter(req => {
    const matchesSearch = req.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (req.returnReferenceId && req.returnReferenceId.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    const matchesSupplier = supplierFilter === 'All' || req.supplierName === supplierFilter;

    return matchesSearch && matchesStatus && matchesSupplier;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Supplier Requests & Claims
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track wholesale replacement claims, credit notes, and physical product returns.
          </p>
        </div>

        <button
          onClick={onOpenNewRequestModal}
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/20 transition-all flex items-center gap-2 self-start sm:self-auto active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Supplier Request</span>
        </button>
      </div>

      {/* Mandatory Supplier Policy Disclaimer Banner */}
      <div className="rounded-2xl bg-amber-50/90 border border-amber-200/90 p-4 sm:p-5 text-amber-900 flex items-start gap-3.5 shadow-xs">
        <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm space-y-1">
          <h4 className="font-bold text-amber-950 flex items-center gap-1.5">
            <span>Supplier Policy & Approval Disclaimer</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-mono font-semibold">
              Policy Requirement
            </span>
          </h4>
          <p className="text-amber-800 leading-relaxed text-xs">
            Approval of replacement goods or credit notes is <strong>not guaranteed</strong>. All outcomes depend strictly on individual pharmaceutical supplier policies, product batch return windows, physical quarantine verification, and manufacturer defect assessment.
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Filter bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search claims by ID, product, or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white text-slate-700"
            >
              <option value="All">All Suppliers</option>
              {uniqueSuppliers.map(sup => (
                <option key={sup} value={sup}>{sup}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white text-slate-700"
            >
              <option value="All">All Statuses ({supplierRequests.length})</option>
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Supplier Requests Table */}
        {filteredRequests.length === 0 ? (
          <EmptyState
            icon={Truck}
            title="No supplier requests found"
            description="There are no supplier requests matching your current filters."
            actionLabel="Add New Request"
            onAction={onOpenNewRequestModal}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Request ID</th>
                  <th className="px-4 py-3.5">Supplier Name</th>
                  <th className="px-4 py-3.5">Product Claimed</th>
                  <th className="px-4 py-3.5 text-center">Qty</th>
                  <th className="px-4 py-3.5">Request Type</th>
                  <th className="px-4 py-3.5">Submitted</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-3.5 font-bold font-mono text-slate-900">
                      {req.id}
                      {req.returnReferenceId && (
                        <div className="text-[10px] text-slate-400 font-mono">
                          Ref: {req.returnReferenceId}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{req.supplierName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-medium text-slate-700 max-w-[180px] truncate">
                      {req.product}
                    </td>
                    <td className="px-4 py-3.5 text-center font-extrabold text-slate-800">
                      {req.quantity}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 font-medium">
                      {req.requestType}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs">
                      {req.dateSubmitted}
                    </td>
                    <td className="px-4 py-3.5">
                      <select
                        value={req.status}
                        onChange={(e) => onUpdateStatus(req.id, e.target.value)}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white shadow-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button
                        onClick={() => onViewRequestDetails(req)}
                        className="px-3 py-1.5 rounded-xl font-semibold text-xs text-sky-600 hover:text-sky-800 hover:bg-sky-50 transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
