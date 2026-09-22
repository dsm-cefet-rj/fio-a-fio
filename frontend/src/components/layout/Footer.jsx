import React from 'react';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto bg-white border-t border-rose-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧶</span>
          <span className="font-extrabold text-zinc-900">Fio a Fio</span>
          <span className="text-xs text-zinc-400">| Protótipo de Validação de Requisitos</span>
        </div>
        <div className="text-xs text-zinc-500 flex items-center gap-1">
          Feito com <Heart size={14} className="text-rose-500 fill-rose-500" /> para a comunidade de artesãos e crocheteiros.
        </div>
        <div className="text-xs text-zinc-400">
          © {new Date().getFullYear()} Fio a Fio. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
