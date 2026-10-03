import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const variants = {
    primary: 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-800 text-white shadow-md shadow-rose-600/25 hover:shadow-rose-600/40 hover:scale-[1.01]',
    secondary: 'bg-rose-100/90 hover:bg-rose-200/90 text-rose-950 border border-rose-300/80 shadow-2xs',
    outline: 'border-2 border-rose-500 text-rose-700 hover:bg-rose-50/80 bg-white font-bold',
    ghost: 'text-slate-700 hover:bg-rose-100/70 hover:text-rose-800',
    gold: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black shadow-md shadow-amber-500/25',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20',
    dark: 'bg-slate-900 hover:bg-slate-800 text-white shadow-md',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-bold',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

