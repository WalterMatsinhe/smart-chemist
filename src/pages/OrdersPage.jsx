import React, { useState } from 'react';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Search,
  CheckCircle2,
  AlertCircle,
  User,
  Phone,
  FileText,
  ArrowRight,
  ClipboardList,
  Clock,
  Filter,
  DollarSign
} from 'lucide-react';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import { CATEGORIES_LIST } from '../data/mockData';

export default function OrdersPage({
  products = [],
  orders = [],
  cart = [],
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  onSubmitOrder,
  onViewOrderDetails,
  onUpdateOrderStatus
}) {
  const [activeTab, setActiveTab] = useState('new-order'); // 'new-order' | 'all-orders'

  // Search & Filter for product picker
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Order List Filter
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Filtered Products for picker
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = selectedCategory === 'All Categories' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalAmount = cartSubtotal; // No hidden fees for prototype

  // Filtered Orders for the management table
  const filteredOrders = orders.filter(o => {
    const matchesStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter;
    const matchesSearch = o.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customerPhone.includes(orderSearchQuery);
    return matchesStatus && matchesSearch;
  });

  const validateOrderForm = () => {
    const errors = {};
    if (!customerName.trim()) {
      errors.customerName = 'Customer name is required';
    }
    if (!customerPhone.trim()) {
      errors.customerPhone = 'Phone number is required for order verification';
    } else if (customerPhone.trim().length < 8) {
      errors.customerPhone = 'Please provide a valid contact phone number';
    }
    if (cart.length === 0) {
      errors.cart = 'Your cart is empty. Please add at least one medication to place an order.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!validateOrderForm()) return;

    // Generate mock order number
    const mockOrderNumber = `ORD-${Math.floor(1011 + Math.random() * 8900)}`;

    const newOrder = {
      id: mockOrderNumber,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      items: cart.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: totalAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      notes: orderNotes.trim() || 'Standard counter pickup requested by customer.'
    };

    onSubmitOrder(newOrder);

    // Reset Form
    setCustomerName('');
    setCustomerPhone('');
    setOrderNotes('');
    setFormErrors({});
  };

  return (
    <div className="space-y-6">
      {/* Top Header & View Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Online Orders System
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Submit customer medication orders or manage recent pharmacy order statuses.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-200/80 p-1 rounded-2xl self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('new-order')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'new-order'
                ? 'bg-white text-sky-700 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            Create Customer Order
          </button>
          <button
            onClick={() => setActiveTab('all-orders')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${activeTab === 'all-orders'
                ? 'bg-white text-sky-700 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <span>Orders Directory</span>
            <span className="px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px]">
              {orders.length}
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'new-order' ? (
        /* New Order Flow: Two-Column Layout (Product Picker & Cart/Checkout Form) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Product Browser for Ordering (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
              <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Search className="w-4 h-4 text-sky-600" />
                Select Products to Order
              </h3>

              {/* Search & Category Filter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search medication..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white text-slate-700"
                >
                  {CATEGORIES_LIST.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Product mini-cards list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[580px] overflow-y-auto pr-1">
                {filteredProducts.map((p) => {
                  const itemInCart = cart.find(c => c.id === p.id);
                  const isOutOfStock = p.stock <= 0 || p.availability === 'Out of Stock';

                  return (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl border border-slate-200 hover:border-sky-300 bg-white transition-all duration-150 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-xs text-slate-900 leading-snug">
                            {p.name}
                          </h4>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                            {p.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{p.packaging}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block leading-none">Price</span>
                          <span className="text-xs font-bold text-slate-900 font-mono">
                            KES {p.price}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onAddToCart(p)}
                          disabled={isOutOfStock}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${isOutOfStock
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : itemInCart
                                ? 'bg-emerald-600 text-white'
                                : 'bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white'
                            }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{itemInCart ? `In Cart (${itemInCart.quantity})` : 'Add'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Customer Order Form & Cart (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Current Cart</h3>
                    <p className="text-xs text-slate-400">{cart.length} unique items selected</p>
                  </div>
                </div>

                {cart.length > 0 && (
                  <button
                    onClick={onClearCart}
                    className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 hover:underline"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Cart</span>
                  </button>
                )}
              </div>

              {/* Cart Error if empty submission attempted */}
              {formErrors.cart && (
                <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formErrors.cart}</span>
                </div>
              )}

              {/* Cart Items List */}
              <div className="divide-y divide-slate-100 my-3 max-h-56 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="py-8 text-center text-slate-400">
                    <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-30 stroke-[1.5]" />
                    <p className="text-xs">Your cart is currently empty.</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Click "Add" on any medicine from the catalogue.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-xs text-slate-800 truncate">{item.name}</h5>
                        <p className="text-[11px] text-slate-400 font-mono">
                          KES {item.price} each
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total Item Price & Remove Button */}
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-800 font-mono">
                          KES {(item.price * item.quantity).toLocaleString()}
                        </p>
                        <button
                          type="button"
                          onClick={() => onRemoveFromCart(item.id)}
                          className="text-[11px] text-rose-500 hover:text-rose-700 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Subtotal & Totals Box */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-mono">KES {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Collection & Handling Fee</span>
                  <span className="text-emerald-600 font-semibold">FREE (Prototype)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-slate-900 font-bold text-sm">
                  <span>Total Amount</span>
                  <span className="text-sky-700 font-extrabold font-mono text-base">
                    KES {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Customer Contact & Order Form */}
              <form onSubmit={handleOrderSubmit} className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Customer Details (No Private Data Collected)
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Customer Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Samuel Karanja"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={`w-full pl-8 pr-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none ${formErrors.customerName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                        }`}
                    />
                  </div>
                  {formErrors.customerName && (
                    <p className="text-rose-500 text-[11px] mt-1">{formErrors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="e.g. +254 712 345 678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className={`w-full pl-8 pr-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none ${formErrors.customerPhone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                        }`}
                    />
                  </div>
                  {formErrors.customerPhone && (
                    <p className="text-rose-500 text-[11px] mt-1">{formErrors.customerPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Delivery or Collection Notes (Optional)
                  </label>
                  <textarea
                    rows="2"
                    placeholder="e.g. Pickup around 4:30 PM, please check dosage note."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${cart.length === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 active:scale-[0.99]'
                    }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Pharmacy Order</span>
                </button>

                <p className="text-[11px] text-center text-slate-400 leading-tight">
                  Educational prototype: Orders are added directly into React state.
                </p>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* Orders Directory Table View */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          {/* Table Filters */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders by ID, name, phone..."
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Status:</span>
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white text-slate-700"
              >
                <option value="All">All Statuses ({orders.length})</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          {filteredOrders.length === 0 ? (
            <EmptyState
              icon={ClipboardList}
              title="No orders found"
              description="No customer orders match the current status filter or search query."
              actionLabel="Reset Filter"
              onAction={() => {
                setOrderStatusFilter('All');
                setOrderSearchQuery('');
              }}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Order ID</th>
                    <th className="px-4 py-3.5">Customer Name</th>
                    <th className="px-4 py-3.5">Items Summary</th>
                    <th className="px-4 py-3.5 text-right">Total Amount</th>
                    <th className="px-4 py-3.5">Date</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-3.5 font-bold font-mono text-slate-900">
                        {ord.id}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-slate-800">
                        {ord.customerName}
                        <div className="text-xs text-slate-400 font-normal font-mono">
                          {ord.customerPhone}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 max-w-[200px] truncate">
                        {ord.items && ord.items.map(i => `${i.productName} (x${i.quantity})`).join(', ')}
                      </td>
                      <td className="px-4 py-3.5 text-right font-bold text-slate-900 font-mono">
                        KES {ord.totalAmount?.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 text-xs">
                        {ord.date}
                      </td>
                      <td className="px-4 py-3.5">
                        <select
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white shadow-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <button
                          onClick={() => onViewOrderDetails(ord)}
                          className="px-3 py-1.5 rounded-xl font-semibold text-xs text-sky-600 hover:text-sky-800 hover:bg-sky-50 transition-colors"
                        >
                          View Details
                        </button>
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
