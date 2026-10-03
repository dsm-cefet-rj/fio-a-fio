import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { useChat } from '../../context/ChatContext';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import {
  MessageCircle,
  User,
  Search,
  BookOpen,
  Video,
  Home
} from 'lucide-react';

export const Navbar = () => {
  const { currentRole } = useRole();
  const location = useLocation();
  const { totalUnreadCount } = useChat();

  return (
    <header className="sticky top-0 z-40 w-full glass-header border-b border-[#EADED5] shadow-2xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Brand Logo */}
          <Link to={currentRole === 'guest' ? '/' : '/feed'}>
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#FEF1F4]/80 p-1.5 rounded-full border border-[#EADED5]">
            <Link
              to={currentRole === 'guest' ? '/' : '/feed'}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                location.pathname === '/feed' || location.pathname === '/'
                  ? 'bg-[#E55B86] text-white shadow-xs'
                  : 'text-[#17151A] hover:text-[#E55B86] hover:bg-white/60'
              }`}
            >
              <Home size={15} />
              <span>Feed</span>
            </Link>
            <Link
              to="/pesquisa"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                location.pathname === '/pesquisa'
                  ? 'bg-[#E55B86] text-white shadow-xs'
                  : 'text-[#17151A] hover:text-[#E55B86] hover:bg-white/60'
              }`}
            >
              <Search size={15} />
              <span>Explorar</span>
            </Link>
            <Link
              to="/videoaulas"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                location.pathname.startsWith('/videoaulas')
                  ? 'bg-[#E55B86] text-white shadow-xs'
                  : 'text-[#17151A] hover:text-[#E55B86] hover:bg-white/60'
              }`}
            >
              <Video size={15} />
              <span>Aulas</span>
            </Link>
            <Link
              to="/materiais"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                location.pathname.startsWith('/materiais')
                  ? 'bg-[#E55B86] text-white shadow-xs'
                  : 'text-[#17151A] hover:text-[#E55B86] hover:bg-white/60'
              }`}
            >
              <BookOpen size={15} />
              <span>Materiais</span>
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {/* Quick Chat Shortcut Icon */}
            <Link
              to="/chat"
              className="relative p-2.5 text-[#17151A] hover:text-[#E55B86] hover:bg-[#FEF1F4] rounded-full transition-all duration-200"
              title="Mensagens Privadas"
              aria-label="Mensagens"
            >
              <MessageCircle size={20} className={location.pathname === '/chat' ? 'text-[#E55B86] fill-[#FEF1F4]' : ''} />
              {totalUnreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#E55B86] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-pulse-glow">
                  {totalUnreadCount}
                </span>
              )}
            </Link>

            {currentRole === 'guest' ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="rounded-full text-xs font-bold text-[#E55B86]">Entrar</Button>
                </Link>
                <Link to="/cadastro">
                  <Button variant="primary" size="sm" className="rounded-full text-xs font-black bg-[#E55B86] text-white">Criar Conta</Button>
                </Link>
              </div>
            ) : (
              <Link
                to="/perfil"
                className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all border ${
                  location.pathname === '/perfil'
                    ? 'bg-[#E55B86] text-white border-[#E55B86] shadow-2xs'
                    : 'bg-white text-[#17151A] hover:bg-[#FEF1F4] hover:text-[#E55B86] border-[#EADED5]'
                }`}
              >
                <User size={15} />
                <span>Perfil</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};


