import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  RotateCcw, 
  Truck, 
  BarChart3, 
  Settings, 
  X
} from 'lucide-react';

export default function Sidebar({ 
  activePage, 
  setActivePage, 
  isOpen, 
  onClose,
  pendingOrdersCount = 0,
  pendingSupplierRequestsCount = 0,
  cartItemCount = 0
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      section: 'Overview',
      badge: null
    },
    {
      id: 'orders',
      label: 'Online Orders',
      icon: ShoppingCart,
      section: 'Pharmacy operations',
      badge: pendingOrdersCount > 0 ? { text: `${pendingOrdersCount} new`, color: 'bg-amber-100 text-amber-800' } : null
    },
    {
      id: 'catalog',
      label: 'Product Catalogue',
      icon: Package,
      section: 'Pharmacy operations',
      badge: cartItemCount > 0 ? { text: `${cartItemCount} in cart`, color: 'bg-sky-100 text-sky-800' } : null
    },
    {
      id: 'returns',
      label: 'Product Returns',
      icon: RotateCcw,
      section: 'Pharmacy operations',
      badge: null
    },
    {
      id: 'supplier-requests',
      label: 'Supplier Requests',
      icon: Truck,
      section: 'Pharmacy operations',
      badge: pendingSupplierRequestsCount > 0 ? { text: `${pendingSupplierRequestsCount} pending`, color: 'bg-orange-100 text-orange-800' } : null
    },
    {
      id: 'reports',
      label: 'Reports & Targets',
      icon: BarChart3,
      section: 'Management',
      badge: null
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      section: 'Management',
      badge: null
    }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-40 isolate w-72 overflow-hidden border-r border-slate-200/90 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:shadow-none lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:z-10`}
      >
        <img
          src="/images/african_customer_care.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full scale-110 object-cover object-[72%_center] blur-[1px]"
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-200/90 via-blue-100/85 to-sky-300/90"
          aria-hidden="true"
        />
        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="mb-5 flex items-center justify-between px-3 lg:hidden">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Menu</span>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close sidebar menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {['Overview', 'Pharmacy operations', 'Management'].map((section) => (
            <div key={section} className="mb-6 last:mb-0">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700">
                {section}
              </p>
              <div className="space-y-1">
                {navItems.filter((item) => item.section === section).map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm transition-all ${
                        isActive
                          ? 'border-sky-700 bg-sky-700 font-semibold text-white shadow-md shadow-sky-900/20'
                          : 'border-white/90 bg-white/95 font-semibold text-slate-800 shadow-sm hover:border-sky-300 hover:bg-white hover:text-sky-900 hover:shadow-md'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className={`h-[18px] w-[18px] transition-colors ${
                          isActive ? 'text-white' : 'text-slate-600 group-hover:text-sky-700'
                        }`} />
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${item.badge.color}`}>
                          {item.badge.text}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
