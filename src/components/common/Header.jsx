import React, { useEffect, useState } from 'react';
import {
  Cross,
  Bell,
  User,
  Menu,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function Header({
  onMenuToggle,
  pendingOrdersCount = 0,
  pendingReturnsCount = 0,
  pendingSuppliersCount = 0,
  onNavigate
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const main = document.querySelector('main');
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 8 || (main?.scrollTop ?? 0) > 8);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    main?.addEventListener('scroll', updateScrollState, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      main?.removeEventListener('scroll', updateScrollState);
    };
  }, []);

  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'New Online Order Received',
      desc: 'Order #ORD-1001 by Amina Muthoni awaiting confirmation.',
      time: '12m ago',
      color: 'blue'
    },
    {
      id: 2,
      type: 'return',
      title: 'Damaged Product Quarantine',
      desc: 'Amoxicillin Capsules 500mg logged for batch inspection.',
      time: '1h ago',
      color: 'orange'
    },
    {
      id: 3,
      type: 'supplier',
      title: 'Supplier Approval Received',
      desc: 'Credit note approved by Harleys Ltd for return #RET-203.',
      time: '3h ago',
      color: 'green'
    }
  ];

  const totalAlerts = pendingOrdersCount + pendingReturnsCount + pendingSuppliersCount;

  return (
    <header className={`sticky top-0 z-30 border-b transition-all duration-300 ${
      isScrolled
        ? 'border-slate-200/70 bg-white/70 shadow-md shadow-slate-900/5 backdrop-blur-xl'
        : 'border-slate-200/90 bg-white shadow-sm'
    }`}>
      {/* Main Header Bar */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-sky-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo & Titles */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate && onNavigate('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20 ring-2 ring-sky-100">
              {/* Medical Cross SVG Icon */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none font-['Outfit',sans-serif]">
                  Smart <span className="text-sky-600">Chemist</span>
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-200">
                  Active System
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-tight mt-0.5 line-clamp-1">
                Online Ordering and Product Returns System
              </p>
            </div>
          </div>
        </div>

        {/* Right: Notification & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-sky-600 hover:bg-sky-50/80 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {totalAlerts > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-pulse">
                  {totalAlerts}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800 text-sm">System Notifications</h4>
                      <span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full text-xs font-semibold">
                        {totalAlerts} pending
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">Mock simulation</span>
                  </div>

                  <div className="divide-y divide-slate-100 my-2 max-h-72 overflow-y-auto">
                    {notifications.map((item) => (
                      <div key={item.id} className="py-2.5 hover:bg-slate-50 px-2 rounded-xl transition-colors">
                        <div className="flex items-start gap-2.5">
                          <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${item.color === 'blue' ? 'bg-sky-500' :
                              item.color === 'orange' ? 'bg-orange-500' : 'bg-emerald-500'
                            }`} />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        if (onNavigate) onNavigate('orders');
                      }}
                      className="text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline"
                    >
                      View All Orders & Activities →
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Area */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-slate-50 transition-all focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                AU
              </div>
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-800">Admin User</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online"></span>
                </div>
                <p className="text-[10px] text-slate-500 leading-none">Chemist Staff</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Menu Dropdown */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800">Admin User (Chemist)</p>
                    <p className="text-[11px] text-slate-500">admin@smartchemist.co.ke</p>
                    <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium border border-emerald-100">
                      <ShieldCheck className="w-3 h-3" /> Full Staff Permissions
                    </div>
                  </div>
                  <div className="py-1 text-xs">
                    <button
                      onClick={() => { setShowUserMenu(false); onNavigate && onNavigate('settings'); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center justify-between"
                    >
                      <span>Pharmacy Settings</span>
                      <span className="text-[10px] text-slate-400">Config</span>
                    </button>
                    <button
                      onClick={() => { setShowUserMenu(false); onNavigate && onNavigate('reports'); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center justify-between"
                    >
                      <span>Evaluation Reports</span>
                      <span className="text-[10px] text-sky-600 font-semibold">CSL Target</span>
                    </button>
                  </div>
                  <div className="pt-2 border-t border-slate-100 px-3">
                    <p className="text-[10px] text-slate-400 italic">No authentication required for this student prototype.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
