import React from 'react';
import { 
  Pill, 
  ShieldAlert, 
  Sparkles, 
  Plus, 
  Check, 
  Building2, 
  CheckCircle,
  FlaskConical,
  Sun,
  Activity,
  Thermometer,
  ShieldCheck,
  Package
} from 'lucide-react';
import Badge from '../common/Badge';

export default function ProductCard({ product, onAddToCart, isInCart }) {
  const getProductIcon = (iconType, category) => {
    switch (iconType) {
      case 'pill':
        return <Pill className="w-7 h-7 text-sky-600" />;
      case 'shield':
        return <ShieldCheck className="w-7 h-7 text-emerald-600" />;
      case 'bottle':
        return <FlaskConical className="w-7 h-7 text-amber-600" />;
      case 'sparkles':
        return <Sparkles className="w-7 h-7 text-indigo-600" />;
      case 'capsule':
        return <Activity className="w-7 h-7 text-rose-600" />;
      case 'flask':
        return <FlaskConical className="w-7 h-7 text-teal-600" />;
      case 'sun':
        return <Sun className="w-7 h-7 text-orange-600" />;
      case 'thermometer':
        return <Thermometer className="w-7 h-7 text-purple-600" />;
      default:
        return <Package className="w-7 h-7 text-sky-600" />;
    }
  };

  const isOutOfStock = product.stock <= 0 || product.availability === 'Out of Stock';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between card-hover transition-all duration-200 group">
      {/* Top Banner / Category & Badge */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
            {product.category}
          </span>
          <Badge 
            variant={
              product.availability === 'In Stock' ? 'in_stock' :
              product.availability === 'Low Stock' ? 'low_stock' : 'out_of_stock'
            }
          >
            {product.availability}
          </Badge>
        </div>

        {/* Product Visual Icon & Name */}
        <div className="flex items-start gap-3.5 my-2">
          <div className="w-13 h-13 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-sky-50/50 transition-all">
            {getProductIcon(product.iconType, product.category)}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base leading-snug group-hover:text-sky-600 transition-colors">
              {product.name}
            </h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {product.packaging}
            </p>
          </div>
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Bottom Information & Action Bar */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-100 bg-slate-50/40">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate max-w-[130px]">{product.supplier}</span>
          </span>
          <span className={`font-semibold ${isOutOfStock ? 'text-rose-600' : 'text-slate-600'}`}>
            Stock: {product.stock} units
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Price</span>
            <div className="text-lg font-extrabold text-slate-900 leading-none">
              KES {product.price.toLocaleString()}
            </div>
          </div>

          <button
            onClick={() => onAddToCart && onAddToCart(product)}
            disabled={isOutOfStock}
            className={`px-3.5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all duration-200 ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : isInCart
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm shadow-sky-600/20 active:scale-95'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Added (+1)</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add to Order</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
