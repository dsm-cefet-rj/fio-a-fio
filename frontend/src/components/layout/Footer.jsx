import React from 'react';
import { Heart } from 'lucide-react';
import { Logo } from '../ui/Logo';

export const Footer = () => {
  return (
    <footer className="mt-auto bg-[#F6DDE5]/70 border-t border-[#E8CCD4] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <span className="text-xs font-semibold text-[#715B62]">| Plataforma de Aprendizagem & Comunidade Artesanal</span>
        </div>
        <div className="text-xs font-medium text-[#715B62] flex items-center gap-1.5">
          Feito com <Heart size={14} className="text-[#B94F70] fill-[#B94F70]" /> para a comunidade de artesãs e crocheteiras.
        </div>
        <div className="text-xs font-medium text-[#715B62]">
          © {new Date().getFullYear()} Fio a Fio. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
