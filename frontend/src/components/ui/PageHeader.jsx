import React from 'react';

export const PageHeader = ({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  variant = 'rose', // 'rose' | 'purple' | 'dark' | 'indigo'
  children,
  className = ''
}) => {
  const bgVariants = {
    rose: 'bg-gradient-to-r from-rose-500 via-rose-400 to-pink-500 text-white',
    purple: 'bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 text-white',
    dark: 'bg-zinc-900 text-white border border-zinc-800',
    indigo: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white',
  };

  const eyebrowVariants = {
    rose: 'bg-white/20 text-white border-white/30',
    purple: 'bg-white/20 text-white border-white/30',
    dark: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    indigo: 'bg-white/20 text-white border-white/30',
  };

  return (
    <div className={`rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${bgVariants[variant]} ${className}`}>
      <div className="space-y-1.5 max-w-2xl">
        {eyebrow && (
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${eyebrowVariants[variant]}`}>
            {Icon && <Icon size={14} />}
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm opacity-90 leading-relaxed">{subtitle}</p>}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
};
