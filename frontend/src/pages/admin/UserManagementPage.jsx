import React, { useState } from 'react';
import { getUsers, updateRecord } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { useQueryClient } from '@tanstack/react-query';
import { useRole } from '../../context/RoleContext';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Users, Ban, CheckCircle } from 'lucide-react';

export const UserManagementPage = () => {
  const [query, setQuery] = useState('');
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const queryClient = useQueryClient();
  const { currentUser } = useRole();
  const { data: users = [], isLoading } = useApiData('users', getUsers);

  const filtered = users.filter(
    (u) => u.name?.toLowerCase().includes(query.toLowerCase()) || u.email?.toLowerCase().includes(query.toLowerCase())
  );

  const toggleSuspension = async (user) => {
    const suspend = !user.isSuspended;
    const action = suspend ? 'suspender' : 'reativar';
    if (!window.confirm(`Deseja ${action} a conta de @${user.username}?`)) return;
    setProcessingId(user.id);
    setError('');
    setNotice('');
    try {
      await updateRecord('users', user.id, {
        isSuspended: suspend,
        suspendedAt: suspend ? new Date().toISOString() : null,
      });
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      setNotice(`Conta de @${user.username} ${suspend ? 'suspensa' : 'reativada'}.`);
    } catch {
      setError('Não foi possível atualizar esta conta. Verifique se o JSON Server está ativo.');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="space-y-1">
        <span className="text-xs uppercase font-extrabold tracking-wider text-rose-600">Painel de Moderação</span>
        <h1 className="text-2xl font-black text-zinc-900">Gestão de Usuários</h1>
        <p className="text-xs text-zinc-500">Visualize a lista de membros cadastrados e gerencie permissões de acesso.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="font-extrabold text-sm text-zinc-900">Usuários Cadastrados</h3>
          <div className="w-full sm:w-64">
            <SearchInput value={query} onChange={setQuery} placeholder="Buscar por nome ou e-mail..." />
          </div>
        </CardHeader>

        <CardBody className="p-0">
          {error && <p role="alert" className="m-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{error}</p>}
          {notice && <p role="status" className="m-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">{notice}</p>}
          {isLoading && <p role="status" className="p-6 text-center text-sm text-zinc-500">Carregando usuários...</p>}
          {!isLoading && filtered.length === 0 && <p className="p-6 text-center text-sm text-zinc-500">Nenhum usuário encontrado.</p>}
          <div className="space-y-3 p-3">
            {filtered.map((u) => (
              <article key={u.id} className="space-y-3 rounded-2xl border border-rose-100 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-words text-sm font-bold text-zinc-900">{u.name}</p>
                    <p className="break-all text-xs text-zinc-500">@{u.username}</p>
                    <p className="break-all text-xs text-zinc-500">{u.email}</p>
                  </div>
                  <Badge variant={u.isSuspended ? 'amber' : 'green'} size="sm">{u.isSuspended ? 'Suspenso' : 'Ativo'}</Badge>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-rose-50 pt-3">
                  <Badge variant={u.role === 'admin' ? 'purple' : u.role === 'creator' ? 'rose' : 'gray'} size="sm">{u.role}</Badge>
                  <Button variant={u.isSuspended ? 'secondary' : 'danger'} size="sm" disabled={processingId === u.id || currentUser?.id === u.id} onClick={() => toggleSuspension(u)}>
                    {u.isSuspended ? <CheckCircle size={14} /> : <Ban size={14} />}
                    <span>{processingId === u.id ? 'Salvando...' : u.isSuspended ? 'Reativar' : 'Suspender'}</span>
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="hidden w-full text-left text-xs">
              <thead className="bg-rose-50/50 border-b border-rose-100 text-zinc-700 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-3.5">Usuário</th>
                  <th className="p-3.5">E-mail</th>
                  <th className="p-3.5">Papel (Role)</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-50 text-zinc-800 font-medium">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-rose-50/20">
                    <td className="p-3.5 font-bold text-zinc-900">
                      {u.name}
                      <p className="text-[10px] text-zinc-400 font-normal">@{u.username}</p>
                    </td>
                    <td className="p-3.5">{u.email}</td>
                    <td className="p-3.5">
                      <Badge variant={u.role === 'admin' ? 'purple' : u.role === 'creator' ? 'rose' : 'gray'} size="sm">
                        {u.role}
                      </Badge>
                    </td>
                    <td className="p-3.5">
                      <Badge variant="green" size="sm">Ativo</Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <Button variant="danger" size="sm" onClick={() => alert(`Simulação: Conta de @${u.username} suspensa.`)}>
                        <Ban size={14} />
                        <span>Suspender</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
