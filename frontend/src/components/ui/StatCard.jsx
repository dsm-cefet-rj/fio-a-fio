import React from 'react';
import { Card, CardBody } from './Card';

export const StatCard = ({
  label,
  value,
  subtext,
  icon: Icon,
  variant = 'default', // 'default' | 'highlight' | 'accent'
  className = ''
}) => {
  if (variant === 'highlight') {
    return (
      <Card className={`bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 text-white shadow-md ${className}`}>
        <CardBody className="p-5 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-100">{label}</span>
          <div className="text-2xl font-black">{value}</div>
          {subtext && <p className="text-[10px] text-purple-200">{subtext}</p>}
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardBody className="p-5 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{label}</span>
          <div className="text-2xl font-black text-zinc-900">{value}</div>
          {subtext && <p className="text-[10px] text-zinc-500">{subtext}</p>}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Icon size={20} />
          </div>
        )}
      </CardBody>
    </Card>
  );
};
