import React from 'react';
import { SearchX } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = SearchX,
  title = 'Nenhum resultado encontrado',
  description = 'Tente ajustar sua busca ou filtro para encontrar o que procura.',
  action
}) => {
  return (
    <div className="bg-white rounded-2xl border border-rose-100 p-8 text-center space-y-3 max-w-md mx-auto my-6 shadow-xs">
      <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
        <Icon size={24} />
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-base text-zinc-900">{title}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
};
