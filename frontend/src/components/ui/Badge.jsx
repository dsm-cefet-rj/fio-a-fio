import React from 'react';

export const Badge = ({ children, variant = 'rose', size = 'md', className = '' }) => {
  const variants = {
    rose: 'bg-rose-100 text-rose-800 border-rose-200',
    pink: 'bg-pink-100 text-pink-800 border-pink-200',
    gray: 'bg-zinc-100 text-zinc-700 border-zinc-200',
    green: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span className={`inline-flex items-center font-semibold rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
