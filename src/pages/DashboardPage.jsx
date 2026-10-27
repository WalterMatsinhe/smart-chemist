import React from 'react';
import {
  Package,
  ShoppingCart,
  RotateCcw,
  Truck,
  ArrowRight,
  PlusCircle,
  TrendingUp,
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';

export default function DashboardPage({
  products = [],
  orders = [],
  returns = [],
  supplierRequests = [],
  onNavigate,
  onViewOrder,
  onViewReturn,
  onOpenNewReturn
}) {
  // Compute key statistics
  const totalProducts = products.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const returnCases = returns.length;
  const pendingSupplierRequests = supplierRequests.filter(s => s.status === 'Pending' || s.status === 'Submitted').length;

  const recentOrders = orders.slice(0, 5);
  const recentReturns = returns.slice(0, 5);

  return (
    <div className="space-y-7">
      {/* Welcome Banner */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-sky-800 via-sky-900 to-indigo-950 text-white shadow-xl shadow-sky-950/10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-sky-100">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Community pharmacy operations</span>
            </div>
            <h2 className="mt-4 font-['Outfit',sans-serif] text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              Welcome to Smart Chemist
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-sky-100 sm:text-base">
              Manage customer orders, medicine returns and supplier requests in one secure, easy-to-use workspace.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('orders')}
                className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-sky-900 shadow-md transition-colors hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
              >
                <ShoppingCart className="h-4 w-4 text-sky-600" />
                <span>Customer Ordering</span>
              </button>
              <button
                onClick={onOpenNewReturn}
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-sky-600/90 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Record Return</span>
              </button>
              <button
                onClick={() => onNavigate('supplier-requests')}
                className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
              >
                <Truck className="h-4 w-4 text-sky-200" />
                <span>Supplier Claims</span>
              </button>
            </div>
          </div>

          <div className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-[340px]">
            <img
              src="/images/african_customer_care.jpg"
              alt="African pharmacist assisting a customer at a community pharmacy"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent lg:bg-gradient-to-r lg:from-sky-900/80 lg:via-sky-900/15 lg:to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2 text-sm font-medium text-white sm:bottom-6 sm:left-7">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-300" />
              <span>Personal care. Trusted service.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle="Pharmaceutical inventory items"
          icon={Package}
          color="blue"
          trend={{ label: 'Catalogue active', value: '100% Mock' }}
          onClick={() => onNavigate('catalog')}
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrders}
          subtitle="Orders awaiting staff action"
          icon={ShoppingCart}
          color="amber"
          trend={{ label: 'Needs processing', value: `${pendingOrders} unfulfilled` }}
          onClick={() => onNavigate('orders')}
        />
        <StatCard
          title="Product Return Cases"
          value={returnCases}
          subtitle="Recorded defect or expiry cases"
          icon={RotateCcw}
          color="orange"
          trend={{ label: 'Quarantined stock', value: 'CSL Logging' }}
          onClick={() => onNavigate('returns')}
        />
        <StatCard
          title="Pending Supplier Requests"
          value={pendingSupplierRequests}
          subtitle="Claims filed with distributors"
          icon={Truck}
          color="purple"
          trend={{ label: 'Under vendor review', value: `${pendingSupplierRequests} active` }}
          onClick={() => onNavigate('supplier-requests')}
        />
      </div>

      {/* Tables Grid: Recent Orders & Recent Product Returns */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Orders Section */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 pb-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base">Recent Online Orders</h3>
                <p className="text-xs text-slate-400 mt-0.5">Latest customer medicine requests</p>
              </div>
              <button
                onClick={() => onNavigate('orders')}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 hover:underline"
              >
                <span>View All ({orders.length})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-3 py-3 text-right">Amount (KES)</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-800 font-mono">
                        {ord.id}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-700">
                        {ord.customerName}
                        <div className="text-[11px] text-slate-400 font-normal">
                          {ord.items?.length || 0} items • {ord.date}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right font-bold text-slate-800 font-mono">
                        KES {ord.totalAmount?.toLocaleString()}
                      </td>
                      <td className="px-3 py-3">
                        <Badge variant={ord.status} size="sm">{ord.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => onViewOrder && onViewOrder(ord)}
                          className="px-2.5 py-1 text-xs font-semibold text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded-lg transition-colors"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-slate-50/70 border-t border-slate-100 text-right text-xs">
            <span className="text-slate-400">Total simulated orders logged: </span>
            <strong className="text-slate-700">{orders.length} orders</strong>
          </div>
        </div>

        {/* Recent Product Returns Section */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 pb-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base">Recent Product Returns</h3>
                <p className="text-xs text-slate-400 mt-0.5">Expired or damaged stock recorded by staff</p>
              </div>
              <button
                onClick={() => onNavigate('returns')}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 hover:underline"
              >
                <span>View All ({returns.length})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Return ID</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-3 py-3 text-center">Qty</th>
                    <th className="px-3 py-3">Reason</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-3 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentReturns.map((ret) => (
                    <tr key={ret.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-800 font-mono">
                        {ret.id}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-700 max-w-[150px] truncate">
                        {ret.productName}
                        <div className="text-[11px] text-slate-400 font-normal">
                          {ret.dateIdentified}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center font-bold text-slate-800">
                        {ret.quantity}
                      </td>
                      <td className="px-3 py-3">
                        <Badge variant={ret.issueType} size="sm">{ret.issueType}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={ret.status} size="sm">{ret.status}</Badge>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <button
                          onClick={() => onViewReturn && onViewReturn(ret)}
                          className="px-2.5 py-1 text-xs font-semibold text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded-lg transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Audited returns in quarantine</span>
            <button
              onClick={onOpenNewReturn}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Record New Return</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
