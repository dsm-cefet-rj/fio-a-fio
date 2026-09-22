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
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const variants = {
    primary: 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm shadow-rose-200',
    secondary: 'bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-200',
    outline: 'border-2 border-rose-400 text-rose-600 hover:bg-rose-50 bg-transparent',
    ghost: 'text-zinc-700 hover:bg-rose-50/70 hover:text-rose-600',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
    dark: 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-semibold',
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
