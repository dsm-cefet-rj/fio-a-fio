import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { Button } from '../ui/Button';
import {
  Home,
  Search,
  BookOpen,
  Video,
  Library,
  User,
  PlusCircle,
  ShoppingBag,
  ShieldAlert,
  Users,
  FileText,
  Layers,
  Menu,
  X
} from 'lucide-react';

export const Navbar = () => {
  const { currentRole } = useRole();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mapeamento de menus por perfil
  const linksByRole = {
    guest: [
      { to: '/', label: 'Início', icon: Home },
      { to: '/videoaulas', label: 'Vídeo-aulas', icon: Video },
      { to: '/materiais', label: 'Materiais', icon: BookOpen },
    ],
    user: [
      { to: '/feed', label: 'Feed', icon: Home },
      { to: '/pesquisa', label: 'Pesquisar', icon: Search },
      { to: '/materiais', label: 'Materiais', icon: BookOpen },
      { to: '/videoaulas', label: 'Vídeo-aulas', icon: Video },
      { to: '/biblioteca', label: 'Minha Biblioteca', icon: Library },
    ],
    creator: [
      { to: '/feed', label: 'Comunidade', icon: Home },
      { to: '/criador/videoaulas', label: 'Minhas Aulas', icon: Video },
      { to: '/criador/videoaulas/cadastrar', label: '+ Nova Aula', icon: PlusCircle },
      { to: '/criador/vendas', label: 'Vendas', icon: ShoppingBag },
      { to: '/biblioteca', label: 'Biblioteca', icon: Library },
    ],
    admin: [
      { to: '/admin/dashboard', label: 'Dashboard Admin', icon: ShieldAlert },
      { to: '/admin/usuarios', label: 'Usuários', icon: Users },
      { to: '/admin/publicacoes', label: 'Moderação', icon: FileText },
      { to: '/admin/conteudos', label: 'Conteúdos', icon: Layers },
      { to: '/feed', label: 'Ver Feed', icon: Home },
    ]
  };

  const navLinks = linksByRole[currentRole] || linksByRole.user;

  return (
    <header className="sticky top-3 sm:top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full shadow-lg shadow-zinc-900/5 px-6 sm:px-8 py-3 sm:py-3.5 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Brand Logo */}
          <Link to={currentRole === 'guest' ? '/' : '/feed'} className="flex items-center gap-2.5 group mr-6 sm:mr-10 md:mr-14 shrink-0">
            <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-200">🧶</span>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 group-hover:text-rose-600 transition-colors">
              Fio a Fio
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 flex-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-500/20 scale-[1.02]'
                      : 'text-zinc-600 hover:bg-rose-50 hover:text-rose-700'
                  }`}
                >
                  <Icon size={16} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {currentRole === 'guest' ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="rounded-full">Entrar</Button>
                </Link>
                <Link to="/cadastro">
                  <Button variant="primary" size="sm" className="rounded-full">Criar Conta</Button>
                </Link>
              </>
            ) : (
              <Link
                to="/perfil"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  location.pathname === '/perfil'
                    ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-500/20'
                    : 'text-zinc-700 hover:bg-rose-50 hover:text-rose-700 border border-zinc-200/80'
                }`}
              >
                <User size={16} />
                <span>Meu Perfil</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-700 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-zinc-100 bg-white/95 backdrop-blur-md rounded-2xl p-4 space-y-1 shadow-xl animate-fadeIn">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive ? 'bg-rose-100 text-rose-800 font-bold' : 'text-zinc-700 hover:bg-rose-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            {currentRole === 'guest' ? (
              <div className="pt-3 flex flex-col gap-2 border-t border-zinc-100">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth size="sm" className="rounded-xl">Entrar</Button>
                </Link>
                <Link to="/cadastro" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth size="sm" className="rounded-xl">Criar Conta</Button>
                </Link>
              </div>
            ) : (
              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                <Link
                  to="/perfil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xs font-bold text-rose-600 hover:text-rose-700"
                >
                  <User size={18} />
                  <span>Meu Perfil</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
