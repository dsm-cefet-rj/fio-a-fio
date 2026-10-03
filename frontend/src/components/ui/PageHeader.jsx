import React from 'react';

export const PageHeader = ({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  variant = 'rose', // 'rose' | 'purple' | 'dark' | 'amber'
  children,
  className = ''
}) => {
  const bgVariants = {
    rose: 'bg-gradient-to-r from-rose-700 via-pink-700 to-rose-600 text-white shadow-xl shadow-rose-900/15 border border-rose-600/40',
    purple: 'bg-gradient-to-r from-purple-800 via-pink-700 to-rose-700 text-white shadow-xl shadow-purple-950/20 border border-purple-600/40',
    amber: 'bg-gradient-to-r from-amber-600 via-rose-600 to-pink-700 text-white shadow-xl shadow-amber-900/15 border border-amber-500/40',
    dark: 'bg-slate-900 text-white border border-slate-800 shadow-xl',
  };

  const eyebrowVariants = {
    rose: 'bg-white/20 text-white border-white/30 backdrop-blur-md',
    purple: 'bg-white/20 text-white border-white/30 backdrop-blur-md',
    amber: 'bg-amber-950/30 text-amber-100 border-amber-300/40 backdrop-blur-md',
    dark: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  };

  return (
    <div className={`rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden ${bgVariants[variant]} ${className}`}>
      {/* Background Subtle Accent Effect */}
      <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="space-y-2 max-w-2xl relative z-10">
        {eyebrow && (
          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${eyebrowVariants[variant]}`}>
            {Icon && <Icon size={14} />}
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-xs">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm font-medium opacity-90 leading-relaxed max-w-xl">{subtitle}</p>}
      </div>
      {children && <div className="shrink-0 relative z-10">{children}</div>}
    </div>
  );
};

