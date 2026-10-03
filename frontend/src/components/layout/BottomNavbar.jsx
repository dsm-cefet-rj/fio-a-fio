import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { useChat } from '../../context/ChatContext';
import { Avatar } from '../ui/Avatar';
import {
  Home,
  Search,
  PlusSquare,
  MessageCircle,
  Video,
  User,
  ShieldAlert,
  BookOpen
} from 'lucide-react';

export const BottomNavbar = () => {
  const { currentRole, currentUser } = useRole();
  const location = useLocation();
  const { totalUnreadCount } = useChat();

  if (['/login', '/cadastro', '/registro', '/stories'].includes(location.pathname)) {
    return null;
  }

  const getNavItems = () => {
    if (currentRole === 'admin') {
      return [
        { to: '/admin/dashboard', label: 'Painel', icon: ShieldAlert },
        { to: '/feed', label: 'Feed', icon: Home },
        { to: '/chat', label: 'Mensagens', icon: MessageCircle, badge: totalUnreadCount },
        { to: '/admin/publicacoes', label: 'Moderar', icon: BookOpen },
        { to: '/perfil', label: 'Perfil', icon: User, isAvatar: true },
      ];
    }

    if (currentRole === 'creator') {
      return [
        { to: '/feed', label: 'Feed', icon: Home },
        { to: '/pesquisa', label: 'Pesquisar', icon: Search },
        { to: '/chat', label: 'Mensagens', icon: MessageCircle, badge: totalUnreadCount },
        { to: '/criador/videoaulas', label: 'Aulas', icon: Video },
        { to: '/perfil', label: 'Perfil', icon: User, isAvatar: true },
      ];
    }

    return [
      { to: currentRole === 'guest' ? '/' : '/feed', label: 'Feed', icon: Home },
      { to: '/pesquisa', label: 'Pesquisar', icon: Search },
      { to: '/chat', label: 'Mensagens', icon: MessageCircle, badge: totalUnreadCount },
      { to: '/videoaulas', label: 'Aulas', icon: Video },
      { to: '/perfil', label: 'Perfil', icon: User, isAvatar: true },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#FBF7EF]/95 backdrop-blur-xl border-t border-[#EADED5] shadow-craft px-2 py-1.5 transition-all duration-300"
      aria-label="Navegação Principal Inferior"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to || (item.to !== '/' && item.to !== '/feed' && location.pathname.startsWith(item.to));

          if (item.highlight) {
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex flex-col items-center justify-center p-1 group"
                aria-label={item.label}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#E55B86] hover:bg-[#D24471] text-white flex items-center justify-center shadow-md shadow-[#E55B86]/25 group-hover:scale-110 group-active:scale-95 transition-all duration-200">
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <span className="text-[10px] font-bold text-[#E55B86] mt-0.5">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 group ${
                isActive ? 'text-[#E55B86] font-bold scale-[1.05]' : 'text-[#896B70] hover:text-[#E55B86]'
              }`}
            >
              {item.isAvatar && currentUser?.avatar ? (
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  <div className={`rounded-full p-[1.5px] transition-all duration-200 ${
                    isActive
                      ? 'ring-2 ring-[#E55B86] ring-offset-1 ring-offset-[#FBF7EF]'
                      : 'ring-1 ring-transparent group-hover:ring-[#EF9FB1]'
                  }`}>
                    <Avatar src={currentUser.avatar} alt={currentUser.name} size="xs" className="w-5 h-5 object-cover rounded-full" />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className={`transition-transform duration-200 ${isActive ? 'scale-110 text-[#E55B86]' : 'group-hover:scale-105'}`}
                  />
                  {item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#E55B86] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse-glow">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
              )}

              <span className={`text-[10px] tracking-tight mt-0.5 transition-all ${
                isActive ? 'font-black text-[#E55B86]' : 'font-semibold text-[#896B70]'
              }`}>
                {item.label}
              </span>

              {isActive && !item.isAvatar && (
                <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#E55B86]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

