import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Plus, 
  ShoppingCart, 
  Sparkles,
  ArrowRight,
  PackageOpen
} from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import { CATEGORIES_LIST } from '../data/mockData';

export default function CatalogPage({ 
  products = [], 
  cart = [], 
  onAddToCart, 
  onNavigateToOrders 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStockStatus, setSelectedStockStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.supplier.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;

      const matchesStock = selectedStockStatus === 'All' || 
                           (selectedStockStatus === 'In Stock' && product.availability === 'In Stock') ||
                           (selectedStockStatus === 'Low Stock' && product.availability === 'Low Stock') ||
                           (selectedStockStatus === 'Out of Stock' && product.availability === 'Out of Stock');

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, selectedStockStatus]);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="space-y-6">
      {/* Header and Cart Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Product Catalogue
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse pharmaceutical inventory, check stock levels, and add items to orders.
          </p>
        </div>

        {/* Floating / Sticky Cart Pill */}
        {totalCartItems > 0 && (
          <button
            onClick={onNavigateToOrders}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-sky-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/20 hover:bg-sky-700 transition-all active:scale-95 self-start sm:self-auto"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span>{totalCartItems} {totalCartItems === 1 ? 'item' : 'items'} in Cart</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-300"></span>
            <span className="font-mono">KES {cartSubtotal.toLocaleString()}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Bar */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by product name, supplier, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white text-slate-700"
            >
              {CATEGORIES_LIST.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Stock Status Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedStockStatus}
              onChange={(e) => setSelectedStockStatus(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white text-slate-700"
            >
              <option value="All">All Stock Levels</option>
              <option value="In Stock">In Stock Only</option>
              <option value="Low Stock">Low Stock (&lt;10)</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="md:col-span-2 flex items-center justify-end gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-xl border transition-all ${
                viewMode === 'grid'
                  ? 'bg-sky-50 text-sky-600 border-sky-200'
                  : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2.5 rounded-xl border transition-all ${
                viewMode === 'table'
                  ? 'bg-sky-50 text-sky-600 border-sky-200'
                  : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600'
              }`}
              title="Table View"
              aria-label="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Counter and Active Filters Bar */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div>
            Showing <strong className="text-slate-800 font-semibold">{filteredProducts.length}</strong> of{' '}
            <strong className="text-slate-800 font-semibold">{products.length}</strong> pharmacy products
          </div>
          {(searchQuery || selectedCategory !== 'All Categories' || selectedStockStatus !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Categories');
                setSelectedStockStatus('All');
              }}
              className="text-xs text-sky-600 hover:text-sky-700 font-semibold hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Product Display: Grid or Table */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          icon={PackageOpen}
          title="No products matched your criteria"
          description="Try relaxing your search terms or resetting the category and stock status filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('All Categories');
            setSelectedStockStatus('All');
          }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => {
            const inCart = cart.some(item => item.id === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                isInCart={inCart}
              />
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Product Name</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Supplier</th>
                  <th className="px-4 py-3.5 text-right">Price (KES)</th>
                  <th className="px-4 py-3.5 text-center">Stock</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => {
                  const inCart = cart.some(item => item.id === product.id);
                  const isOutOfStock = product.stock <= 0 || product.availability === 'Out of Stock';

                  return (
                    <tr key={product.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-slate-900">
                        {product.name}
                        <div className="text-xs text-slate-400 font-normal">{product.packaging}</div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600">{product.category}</td>
                      <td className="px-4 py-3.5 text-slate-500">{product.supplier}</td>
                      <td className="px-4 py-3.5 text-right font-bold text-slate-800 font-mono">
                        KES {product.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5 text-center font-semibold text-slate-700">
                        {product.stock}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge
                          variant={
                            product.availability === 'In Stock' ? 'in_stock' :
                            product.availability === 'Low Stock' ? 'low_stock' : 'out_of_stock'
                          }
                          size="sm"
                        >
                          {product.availability}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <button
                          onClick={() => onAddToCart && onAddToCart(product)}
                          disabled={isOutOfStock}
                          className={`px-3 py-1.5 rounded-xl font-semibold text-xs transition-all ${
                            isOutOfStock
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : inCart
                              ? 'bg-emerald-600 text-white'
                              : 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
                          }`}
                        >
                          {inCart ? 'In Cart (+1)' : 'Add to Order'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
