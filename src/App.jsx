import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Toast from './components/common/Toast';
import DashboardPage from './pages/DashboardPage';
import CatalogPage from './pages/CatalogPage';
import OrdersPage from './pages/OrdersPage';
import ReturnsPage from './pages/ReturnsPage';
import SupplierRequestsPage from './pages/SupplierRequestsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

// Modals
import OrderDetailsModal from './components/orders/OrderDetailsModal';
import NewReturnModal from './components/returns/NewReturnModal';
import ReturnDetailsModal from './components/returns/ReturnDetailsModal';
import NewSupplierRequestModal from './components/suppliers/NewSupplierRequestModal';
import SupplierRequestDetailsModal from './components/suppliers/SupplierRequestDetailsModal';

// Initial Mock Data
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_RETURNS, 
  INITIAL_SUPPLIER_REQUESTS, 
  INITIAL_SETTINGS 
} from './data/mockData';

// Safe LocalStorage helpers with automatic fallback
const loadFromStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    return fallback;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // Graceful fallback if storage disabled
  }
};

export default function App() {
  // Navigation & UI State
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Core Data State (in React state, with safe storage sync)
  const [products, setProducts] = useState(() => loadFromStorage('sc_products', INITIAL_PRODUCTS));
  const [orders, setOrders] = useState(() => loadFromStorage('sc_orders', INITIAL_ORDERS));
  const [returns, setReturns] = useState(() => loadFromStorage('sc_returns', INITIAL_RETURNS));
  const [supplierRequests, setSupplierRequests] = useState(() => loadFromStorage('sc_supplier_requests', INITIAL_SUPPLIER_REQUESTS));
  const [settings, setSettings] = useState(() => loadFromStorage('sc_settings', INITIAL_SETTINGS));
  const [cart, setCart] = useState(() => loadFromStorage('sc_cart', []));

  // Modal Dialog States
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [isNewReturnOpen, setIsNewReturnOpen] = useState(false);
  const [selectedSupplierRequest, setSelectedSupplierRequest] = useState(null);
  const [isNewSupplierRequestOpen, setIsNewSupplierRequestOpen] = useState(false);
  const [supplierEscalateInitialData, setSupplierEscalateInitialData] = useState(null);

  // Sync state changes to storage
  useEffect(() => { saveToStorage('sc_products', products); }, [products]);
  useEffect(() => { saveToStorage('sc_orders', orders); }, [orders]);
  useEffect(() => { saveToStorage('sc_returns', returns); }, [returns]);
  useEffect(() => { saveToStorage('sc_supplier_requests', supplierRequests); }, [supplierRequests]);
  useEffect(() => { saveToStorage('sc_settings', settings); }, [settings]);
  useEffect(() => { saveToStorage('sc_cart', cart); }, [cart]);

  // Dark mode effect
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Toast Notification Trigger
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Cart Management
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        triggerToast(`Increased quantity for ${product.name}`, 'info');
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      triggerToast(`Added ${product.name} to order cart`, 'success');
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    triggerToast('Item removed from cart', 'info');
  };

  const handleClearCart = () => {
    setCart([]);
    triggerToast('Cart cleared', 'info');
  };

  // Order Operations
  const handleSubmitOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    triggerToast(`Order ${newOrder.id} successfully created!`, 'success');
    setActivePage('orders');
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
    triggerToast(`Order ${orderId} updated to ${newStatus}`, 'success');
  };

  // Return Case Operations
  const handleAddReturn = (newReturn) => {
    setReturns((prev) => [newReturn, ...prev]);
    triggerToast(`Return case ${newReturn.id} recorded in quarantine log`, 'success');
  };

  const handleUpdateReturnStatus = (returnId, newStatus) => {
    setReturns((prev) =>
      prev.map((ret) => (ret.id === returnId ? { ...ret, status: newStatus } : ret))
    );
    if (selectedReturn && selectedReturn.id === returnId) {
      setSelectedReturn((prev) => ({ ...prev, status: newStatus }));
    }
    triggerToast(`Return ${returnId} updated to ${newStatus}`, 'success');
  };

  const handleEscalateToSupplier = (returnItem) => {
    setSupplierEscalateInitialData(returnItem);
    setIsNewSupplierRequestOpen(true);
  };

  // Supplier Request Operations
  const handleAddSupplierRequest = (newRequest) => {
    setSupplierRequests((prev) => [newRequest, ...prev]);
    
    // If escalated from a return, mark return as Supplier Escalated
    if (newRequest.returnReferenceId && newRequest.returnReferenceId.startsWith('RET-')) {
      handleUpdateReturnStatus(newRequest.returnReferenceId, 'Supplier Escalated');
    }

    triggerToast(`Supplier Request ${newRequest.id} submitted!`, 'success');
  };

  const handleUpdateSupplierRequestStatus = (requestId, newStatus) => {
    setSupplierRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: newStatus } : req))
    );
    if (selectedSupplierRequest && selectedSupplierRequest.id === requestId) {
      setSelectedSupplierRequest((prev) => ({ ...prev, status: newStatus }));
    }
    triggerToast(`Supplier Request ${requestId} set to ${newStatus}`, 'success');
  };

  // Settings & Reset
  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    triggerToast('Settings saved successfully', 'success');
  };

  const handleResetDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setReturns(INITIAL_RETURNS);
    setSupplierRequests(INITIAL_SUPPLIER_REQUESTS);
    setSettings(INITIAL_SETTINGS);
    setCart([]);
    try {
      localStorage.clear();
    } catch (e) {}
    triggerToast('Reset to original default mock data', 'info');
  };

  // Counts for Badges & Alerts
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const pendingSupplierRequestsCount = supplierRequests.filter(
    (s) => s.status === 'Pending' || s.status === 'Submitted'
  ).length;
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`min-h-screen flex flex-col ${settings.darkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* Header */}
      <Header
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        pendingOrdersCount={pendingOrdersCount}
        pendingReturnsCount={returns.filter(r => r.status === 'Recorded').length}
        pendingSuppliersCount={pendingSupplierRequestsCount}
        onNavigate={(page) => setActivePage(page)}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Sidebar */}
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          pendingOrdersCount={pendingOrdersCount}
          pendingSupplierRequestsCount={pendingSupplierRequestsCount}
          cartItemCount={totalCartCount}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {activePage === 'dashboard' && (
            <DashboardPage
              products={products}
              orders={orders}
              returns={returns}
              supplierRequests={supplierRequests}
              onNavigate={(page) => setActivePage(page)}
              onViewOrder={(order) => setSelectedOrder(order)}
              onViewReturn={(ret) => setSelectedReturn(ret)}
              onOpenNewReturn={() => setIsNewReturnOpen(true)}
            />
          )}

          {activePage === 'orders' && (
            <OrdersPage
              products={products}
              orders={orders}
              cart={cart}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveFromCart={handleRemoveFromCart}
              onClearCart={handleClearCart}
              onSubmitOrder={handleSubmitOrder}
              onViewOrderDetails={(order) => setSelectedOrder(order)}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}

          {activePage === 'catalog' && (
            <CatalogPage
              products={products}
              cart={cart}
              onAddToCart={handleAddToCart}
              onNavigateToOrders={() => setActivePage('orders')}
            />
          )}

          {activePage === 'returns' && (
            <ReturnsPage
              returns={returns}
              products={products}
              onAddReturn={handleAddReturn}
              onViewReturnDetails={(ret) => setSelectedReturn(ret)}
              onEscalateToSupplier={handleEscalateToSupplier}
              onOpenNewReturnModal={() => setIsNewReturnOpen(true)}
            />
          )}

          {activePage === 'supplier-requests' && (
            <SupplierRequestsPage
              supplierRequests={supplierRequests}
              onAddRequest={handleAddSupplierRequest}
              onUpdateStatus={handleUpdateSupplierRequestStatus}
              onViewRequestDetails={(req) => setSelectedSupplierRequest(req)}
              onOpenNewRequestModal={() => {
                setSupplierEscalateInitialData(null);
                setIsNewSupplierRequestOpen(true);
              }}
            />
          )}

          {activePage === 'reports' && (
            <ReportsPage
              orders={orders}
              returns={returns}
              supplierRequests={supplierRequests}
              products={products}
            />
          )}

          {activePage === 'settings' && (
            <SettingsPage
              settings={settings}
              onSaveSettings={handleSaveSettings}
              onResetDefaults={handleResetDefaults}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <OrderDetailsModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onUpdateStatus={handleUpdateOrderStatus}
      />

      <NewReturnModal
        isOpen={isNewReturnOpen}
        onClose={() => setIsNewReturnOpen(false)}
        onAddReturn={handleAddReturn}
        products={products}
      />

      <ReturnDetailsModal
        isOpen={!!selectedReturn}
        onClose={() => setSelectedReturn(null)}
        returnItem={selectedReturn}
        onUpdateStatus={handleUpdateReturnStatus}
        onEscalateToSupplier={handleEscalateToSupplier}
      />

      <NewSupplierRequestModal
        isOpen={isNewSupplierRequestOpen}
        onClose={() => {
          setIsNewSupplierRequestOpen(false);
          setSupplierEscalateInitialData(null);
        }}
        onAddRequest={handleAddSupplierRequest}
        initialData={supplierEscalateInitialData}
      />

      <SupplierRequestDetailsModal
        isOpen={!!selectedSupplierRequest}
        onClose={() => setSelectedSupplierRequest(null)}
        request={selectedSupplierRequest}
        onUpdateStatus={handleUpdateSupplierRequestStatus}
      />

      {/* Floating Feedback Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
