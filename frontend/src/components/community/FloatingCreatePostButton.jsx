import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { CreatePostModal } from './CreatePostModal';

export const FloatingCreatePostButton = () => {
  const { currentRole } = useRole();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Visitantes não criam publicações
  if (currentRole === 'guest') {
    return null;
  }

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
        className="fixed right-4 z-40 animate-fade-in sm:right-8"
        style={{ bottom: 'calc(5.25rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex min-h-12 items-center gap-2.5 rounded-full border border-white/40 bg-[#B94F70] px-4 py-3 font-extrabold text-white shadow-lg shadow-[#963B58]/20 transition-all duration-200 hover:bg-[#963B58] hover:shadow-xl active:scale-95 sm:px-5"
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
