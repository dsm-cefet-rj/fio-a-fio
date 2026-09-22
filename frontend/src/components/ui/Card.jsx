import React from 'react';

export const Card = ({ children, className = '', hoverable = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden ${
        hoverable ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-5 py-4 border-b border-rose-50 ${className}`}>{children}</div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-5 py-3.5 bg-rose-50/30 border-t border-rose-50 ${className}`}>{children}</div>
);
