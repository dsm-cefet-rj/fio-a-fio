import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { CreatePostModal } from './CreatePostModal';

export const FloatingCreatePostButton = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define routes where the floating button SHOULD be visible
  const allowedRoutes = ['/feed', '/pesquisa', '/perfil'];

  // Check if current route matches allowed list
  const shouldShow = allowedRoutes.some(route =>
    location.pathname === route || (route !== '/' && location.pathname.startsWith(route) && !location.pathname.includes('/editar'))
  );

  // Exclude auth, checkout, admin, form editing, stories, and creation routes
  const excludedPaths = [
    '/login',
    '/cadastro',
    '/registro',
    '/perfil/editar',
    '/compra',
    '/pagamento',
    '/confirmacao-compra',
    '/admin',
    '/criador',
    '/stories',
    '/publicacao/criar'
  ];

  const isExcluded = excludedPaths.some(path => location.pathname.startsWith(path));

  if (!shouldShow || isExcluded) {
    return null;
  }

  return (
    <>
      <div
        className="fixed right-5 sm:right-8 z-40 animate-fade-in"
        style={{ bottom: 'calc(4.75rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-2.5 bg-[#E55B86] hover:bg-[#D24471] text-white font-extrabold py-3.5 px-5 sm:px-6 rounded-full shadow-lg shadow-[#E55B86]/30 hover:shadow-xl hover:shadow-[#E55B86]/40 hover:scale-105 active:scale-95 border border-white/30 backdrop-blur-md transition-all duration-300"
          aria-label="Criar nova publicação"
          title="Criar nova publicação"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
            <Plus size={18} strokeWidth={3} />
          </div>
          <span className="text-xs sm:text-sm tracking-wide hidden sm:inline">Criar Publicação</span>
        </button>
      </div>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
