import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { Avatar } from '../ui/Avatar';
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
  X,
  LogOut
} from 'lucide-react';

export const Navbar = () => {
  const { currentRole, currentUser } = useRole();
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
      { to: '/perfil', label: 'Meu Perfil', icon: User },
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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to={currentRole === 'guest' ? '/' : '/feed'} className="flex items-center gap-2 group">
            <span className="text-2xl">🧶</span>
            <span className="text-xl font-extrabold tracking-tight text-zinc-900 group-hover:text-rose-600 transition-colors">
              Fio a Fio
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-rose-100 text-rose-800 font-bold shadow-2xs'
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
          <div className="hidden md:flex items-center gap-3">
            {currentRole === 'guest' ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Entrar</Button>
                </Link>
                <Link to="/cadastro">
                  <Button variant="primary" size="sm">Criar Conta</Button>
                </Link>
              </>
            ) : (
              <Link to="/perfil" className="flex items-center gap-2 pl-2 border-l border-rose-100">
                <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
                <span className="text-xs font-bold text-zinc-800">{currentUser.name}</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-700 hover:text-rose-600 rounded-xl hover:bg-rose-50"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-rose-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive ? 'bg-rose-100 text-rose-800 font-bold' : 'text-zinc-700 hover:bg-rose-50'
                }`}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
          {currentRole === 'guest' ? (
            <div className="pt-2 flex flex-col gap-2 border-t border-rose-100">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" fullWidth size="sm">Entrar</Button>
              </Link>
              <Link to="/cadastro" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" fullWidth size="sm">Criar Conta</Button>
              </Link>
            </div>
          ) : (
            <div className="pt-2 border-t border-rose-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
                <span className="text-xs font-bold text-zinc-800">{currentUser.name}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
