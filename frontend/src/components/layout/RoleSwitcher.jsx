import React, { useState } from 'react';
import { useRole } from '../../context/RoleContext';
import { UserCheck, Sparkles, Shield, UserX, ChevronDown, Repeat } from 'lucide-react';

export const RoleSwitcher = ({ compact = false }) => {
  const { currentRole, switchRole } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    { id: 'user', label: 'Aluna / Crocheteira', icon: UserCheck, color: 'bg-[#B94F70]' },
    { id: 'creator', label: 'Criadora / Professora', icon: Sparkles, color: 'bg-purple-600' },
    { id: 'admin', label: 'Administradora', icon: Shield, color: 'bg-[#251D20]' },
    { id: 'guest', label: 'Visitante (Deslogado)', icon: UserX, color: 'bg-amber-600' },
  ];

  const activeRoleObj = roles.find(r => r.id === currentRole) || roles[0];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F6DDE5] text-[#B94F70] border border-[#D98CA1]/80 hover:bg-[#F1DFD8] hover:text-[#251D20] transition-all shadow-2xs"
        title="Alternar perspectiva do perfil"
      >
        <Repeat size={13} className="text-[#B94F70]" />
        <span>Visão: <strong className="font-extrabold text-[#251D20]">{activeRoleObj.label}</strong></span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-[#E8CCD4] shadow-xl rounded-2xl p-2 z-50 animate-fade-in">
          <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#715B62] border-b border-[#E8CCD4] mb-1">
            Mudar Perspectiva do Perfil
          </div>
          {roles.map((r) => {
            const Icon = r.icon;
            const isSelected = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => {
                  switchRole(r.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                  isSelected
                    ? 'bg-[#F6DDE5] text-[#B94F70] font-extrabold shadow-2xs'
                    : 'text-[#251D20] hover:bg-[#F8E9ED] hover:text-[#B94F70]'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${r.color}`} />
                <Icon size={15} />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
