import React, { useState } from 'react';
import { 
  RotateCcw, 
  PlusCircle, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Truck,
  Archive,
  ArrowRight
} from 'lucide-react';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import { SUPPLIERS_LIST, CATEGORIES_LIST } from '../data/mockData';

export default function ReturnsPage({ 
  returns = [], 
  products = [], 
  onAddReturn, 
  onViewReturnDetails, 
  onEscalateToSupplier,
  onOpenNewReturnModal 
}) {
  const [activeTab, setActiveTab] = useState('table'); // 'table' | 'form'
  const [searchQuery, setSearchQuery] = useState('');
  const [issueFilter, setIssueFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Inline form state
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
  const [formErrors, setFormErrors] = useState({});

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

  const filteredReturns = returns.filter(ret => {
    const matchesSearch = ret.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ret.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ret.supplierName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIssue = issueFilter === 'All' || ret.issueType === issueFilter;
    const matchesStatus = statusFilter === 'All' || ret.status === statusFilter;
    return matchesSearch && matchesIssue && matchesStatus;
  });

  const handleProductSelect = (e) => {
    const selectedName = e.target.value;
    const matched = products.find(p => p.name === selectedName);
    if (matched) {
      setFormData(prev => ({
        ...prev,
        productName: matched.name,
        category: matched.category,
        supplierName: matched.supplier || prev.supplierName
      }));
    } else {
      setFormData(prev => ({ ...prev, productName: selectedName }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.productName.trim()) errs.productName = 'Product name is required';
    if (!formData.quantity || Number(formData.quantity) <= 0) errs.quantity = 'Quantity must be greater than 0';
    if (!formData.dateIdentified) errs.dateIdentified = 'Date identified is required';
    if (formData.issueType === 'Expired' && !formData.expiryDate) {
      errs.expiryDate = 'Expiry date is required for expired products';
    }
    if (!formData.description.trim()) errs.description = 'Please enter notes or description of the issue';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newRecord = {
      id: `RET-${Math.floor(215 + Math.random() * 700)}`,
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
    setFormErrors({});
    setActiveTab('table');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Product Returns Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Authorised staff portal to record expired, damaged, or erroneous medication batches.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-200/80 p-1 rounded-2xl self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'table'
                ? 'bg-white text-sky-700 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Quarantine Records ({returns.length})
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'form'
                ? 'bg-white text-sky-700 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>Record Defect / Return</span>
          </button>
        </div>
      </div>

      {activeTab === 'form' ? (
        /* Defect Intake Form */
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm max-w-3xl mx-auto">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-5">
            <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Record Expired or Damaged Product</h3>
              <p className="text-xs text-slate-500">Authorised Staff Inventory Inspection Log</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {/* Warning alert */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-start gap-2.5 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Quality Assurance Protocol:</strong> Damaged packages and expired medications must be physically isolated in the designated quarantine bin immediately after logging.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  list="returns-products-list"
                  placeholder="e.g. Cough Syrup 150ml"
                  value={formData.productName}
                  onChange={handleProductSelect}
                  className={`w-full px-3 py-2 rounded-xl border ${
                    formErrors.productName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  } focus:ring-2 focus:ring-sky-500 focus:outline-none`}
                />
                <datalist id="returns-products-list">
                  {products.map(p => (
                    <option key={p.id} value={p.name} />
                  ))}
                </datalist>
                {formErrors.productName && (
                  <p className="text-rose-500 text-[11px] mt-1">{formErrors.productName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white text-slate-700"
                >
                  {CATEGORIES_LIST.filter(c => c !== 'All Categories').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

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
                    formErrors.quantity ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  } focus:ring-2 focus:ring-sky-500 focus:outline-none`}
                />
                {formErrors.quantity && (
                  <p className="text-rose-500 text-[11px] mt-1">{formErrors.quantity}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Supplier Name <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.supplierName}
                  onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white text-slate-700"
                >
                  {SUPPLIERS_LIST.map(sup => (
                    <option key={sup} value={sup}>{sup}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Issue Type <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.issueType}
                  onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white text-slate-700"
                >
                  {issueTypes.map(t => (
                    <option key={t} value={t}>{t}</option>
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white text-slate-700"
                >
                  {requestedActions.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Date Identified <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateIdentified}
                  onChange={(e) => setFormData({ ...formData, dateIdentified: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
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
                    formErrors.expiryDate ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  } focus:ring-2 focus:ring-sky-500 focus:outline-none`}
                />
                {formErrors.expiryDate && (
                  <p className="text-rose-500 text-[11px] mt-1">{formErrors.expiryDate}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description / Defect Details <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows="3"
                placeholder="Include batch number, physical observation, or reason for return..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full px-3 py-2 rounded-xl border ${
                  formErrors.description ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                } focus:ring-2 focus:ring-sky-500 focus:outline-none`}
              ></textarea>
              {formErrors.description && (
                <p className="text-rose-500 text-[11px] mt-1">{formErrors.description}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab('table')}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-sm shadow-sky-600/20 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Return Record</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Returns Table View */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          {/* Table Filters */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search returns by ID, product, or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={issueFilter}
                onChange={(e) => setIssueFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white text-slate-700"
              >
                <option value="All">All Issue Types</option>
                <option value="Expired">Expired</option>
                <option value="Damaged packaging">Damaged packaging</option>
                <option value="Wrong product">Wrong product</option>
                <option value="Incorrect quantity">Incorrect quantity</option>
                <option value="Other">Other</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white text-slate-700"
              >
                <option value="All">All Statuses</option>
                <option value="Recorded">Recorded</option>
                <option value="Under Review">Under Review</option>
                <option value="Supplier Escalated">Supplier Escalated</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Table Body */}
          {filteredReturns.length === 0 ? (
            <EmptyState
              icon={RotateCcw}
              title="No product return records found"
              description="No returns match your current filter criteria."
              actionLabel="Record New Return"
              onAction={() => setActiveTab('form')}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Return ID</th>
                    <th className="px-4 py-3.5">Product</th>
                    <th className="px-4 py-3.5 text-center">Quantity</th>
                    <th className="px-4 py-3.5">Reason / Issue</th>
                    <th className="px-4 py-3.5">Date Identified</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReturns.map((ret) => (
                    <tr key={ret.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-3.5 font-bold font-mono text-slate-900">
                        {ret.id}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-slate-800">
                        {ret.productName}
                        <div className="text-xs text-slate-400 font-normal">
                          {ret.supplierName} • {ret.category}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center font-extrabold text-slate-800">
                        {ret.quantity}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant={ret.issueType} size="sm">{ret.issueType}</Badge>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 text-xs">
                        {ret.dateIdentified}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant={ret.status} size="sm">{ret.status}</Badge>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => onViewReturnDetails(ret)}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold text-sky-600 hover:bg-sky-50 transition-colors"
                          >
                            Details
                          </button>
                          {ret.status !== 'Supplier Escalated' && (
                            <button
                              onClick={() => onEscalateToSupplier(ret)}
                              title="Escalate to Supplier Claim"
                              className="px-2 py-1 rounded-lg text-[11px] font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors flex items-center gap-1"
                            >
                              <Truck className="w-3 h-3" />
                              <span>Escalate</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
