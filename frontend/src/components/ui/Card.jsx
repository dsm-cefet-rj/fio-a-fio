import React from 'react';

export const Card = ({ children, className = '', hoverable = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-3xl border border-rose-200/70 shadow-[0_4px_20px_-2px_rgba(136,19,55,0.05),0_2px_6px_-1px_rgba(0,0,0,0.02)] overflow-hidden ${
        hoverable ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-4px_rgba(225,29,72,0.14)] hover:border-rose-300 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4.5 border-b border-rose-100/80 ${className}`}>{children}</div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 bg-rose-50/40 border-t border-rose-100/80 ${className}`}>{children}</div>
);

