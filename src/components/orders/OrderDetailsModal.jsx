import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import { 
  User, 
  Phone, 
  Calendar, 
  FileText, 
  Package, 
  DollarSign, 
  CheckCircle,
  Truck
} from 'lucide-react';

export default function OrderDetailsModal({ isOpen, onClose, order, onUpdateStatus }) {
  if (!order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order Details – ${order.id}`}
      subtitle="Online customer medication order record"
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        {/* Order Header / Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div>
            <span className="text-xs text-slate-400 font-medium">Order Status</span>
            <div className="mt-1">
              <Badge variant={order.status} size="lg">{order.status}</Badge>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Change Status:
            </label>
            <select
              value={order.status}
              onChange={(e) => onUpdateStatus && onUpdateStatus(order.id, e.target.value)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white shadow-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Customer Information Card */}
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <User className="w-4 h-4 text-sky-600" />
            Customer Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-slate-400">Full Name</p>
              <p className="font-semibold text-slate-800">{order.customerName}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Phone Number</p>
              <p className="font-semibold text-slate-800 font-mono">{order.customerPhone}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Order Date</p>
              <p className="font-semibold text-slate-800">{order.date}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Billed</p>
              <p className="font-bold text-sky-700">KES {order.totalAmount.toLocaleString()}</p>
            </div>
          </div>

          {order.notes && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-400">Delivery or Collection Notes:</p>
              <p className="text-xs font-medium text-slate-600 mt-0.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                "{order.notes}"
              </p>
            </div>
          )}
        </div>

        {/* Order Items Table */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-sky-600" />
            Ordered Items ({order.items ? order.items.length : 0})
          </h4>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">Item Description</th>
                  <th className="px-3 py-2.5 text-center">Qty</th>
                  <th className="px-3 py-2.5 text-right">Unit Price</th>
                  <th className="px-4 py-2.5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items && order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="px-4 py-2.5 font-medium text-slate-800">
                      {item.productName}
                    </td>
                    <td className="px-3 py-2.5 text-center font-semibold text-slate-700">
                      {item.quantity}
                    </td>
                    <td className="px-3 py-2.5 text-right text-slate-500 font-mono">
                      KES {item.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 text-right font-bold text-slate-800 font-mono">
                      KES {(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t border-slate-200 text-slate-800">
                <tr>
                  <td colSpan="3" className="px-4 py-3 text-right">Total Amount:</td>
                  <td className="px-4 py-3 text-right text-sky-700 font-mono text-sm">
                    KES {order.totalAmount.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Footer actions */}
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
