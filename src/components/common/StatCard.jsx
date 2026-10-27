import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  color = 'blue',
  onClick 
}) {
  const colorMap = {
    blue: {
      bg: 'bg-sky-50 text-sky-600',
      border: 'border-sky-100 hover:border-sky-300',
      gradient: 'from-sky-500/10 to-transparent',
      accent: 'text-sky-600'
    },
    amber: {
      bg: 'bg-amber-50 text-amber-600',
      border: 'border-amber-100 hover:border-amber-300',
      gradient: 'from-amber-500/10 to-transparent',
      accent: 'text-amber-600'
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-600',
      border: 'border-emerald-100 hover:border-emerald-300',
      gradient: 'from-emerald-500/10 to-transparent',
      accent: 'text-emerald-600'
    },
    orange: {
      bg: 'bg-orange-50 text-orange-600',
      border: 'border-orange-100 hover:border-orange-300',
      gradient: 'from-orange-500/10 to-transparent',
      accent: 'text-orange-600'
    },
    purple: {
      bg: 'bg-purple-50 text-purple-600',
      border: 'border-purple-100 hover:border-purple-300',
      gradient: 'from-purple-500/10 to-transparent',
      accent: 'text-purple-600'
    }
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden bg-white rounded-2xl p-5 border ${scheme.border} shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className={`absolute top-0 right-0 h-28 w-28 bg-gradient-to-br ${scheme.gradient} rounded-bl-full pointer-events-none opacity-60`} />
      
      <div className="flex items-start justify-between">
        <div className="min-w-0 pr-2">
          <p className="text-sm font-semibold leading-5 text-slate-600">{title}</p>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            {value}
          </h3>
          {subtitle && (
            <p className="mt-1 flex items-center gap-1.5 text-xs leading-5 text-slate-500">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className={`shrink-0 rounded-xl p-3 ${scheme.bg} shadow-sm ring-1 ring-inset ring-black/5`}>
          {Icon && <Icon className="h-5 w-5 stroke-[2]" />}
        </div>
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{trend.label}</span>
          <span className={`font-semibold ${scheme.accent}`}>{trend.value}</span>
        </div>
      )}
    </div>
  );
}
