import React, { useState } from 'react';
import { useRole } from '../../context/RoleContext';
import { UserCheck, Sparkles, Shield, UserX, ChevronUp, ChevronDown } from 'lucide-react';

export const RoleSwitcher = () => {
  const { currentRole, switchRole } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    { id: 'user', label: 'Usuário (Aluno)', icon: UserCheck, color: 'bg-rose-500' },
    { id: 'creator', label: 'Criador (Professor)', icon: Sparkles, color: 'bg-purple-600' },
    { id: 'admin', label: 'Administrador', icon: Shield, color: 'bg-zinc-900' },
    { id: 'guest', label: 'Visitante (Auth)', icon: UserX, color: 'bg-amber-600' },
  ];

  const activeRoleObj = roles.find(r => r.id === currentRole) || roles[0];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-2 bg-white/95 backdrop-blur-md border border-rose-200 shadow-xl rounded-2xl p-2 w-56 flex flex-col gap-1 animate-scaleUp">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100">
            Simulador de Perfil (Front-end)
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
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                  isSelected
                    ? 'bg-rose-100 text-rose-900 font-bold'
                    : 'text-zinc-700 hover:bg-rose-50 hover:text-rose-700'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${r.color}`} />
                <Icon size={16} />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold px-3.5 py-2.5 rounded-full shadow-lg border border-zinc-700 transition-all hover:scale-105 active:scale-95"
      >
        <div className={`w-2 h-2 rounded-full ${activeRoleObj.color}`} />
        <span>Modo: <b>{activeRoleObj.label}</b></span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>
    </div>
  );
};
