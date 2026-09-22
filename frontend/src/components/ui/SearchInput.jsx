import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchInput = ({ value, onChange, placeholder = 'Pesquisar...', className = '' }) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="absolute left-3.5 text-zinc-400 pointer-events-none" size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-rose-100 rounded-full pl-10 pr-9 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 shadow-xs outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 text-zinc-400 hover:text-zinc-600 p-0.5 rounded-full hover:bg-zinc-100"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
