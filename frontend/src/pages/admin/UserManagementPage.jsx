import React, { useState } from 'react';
import { MOCK_USERS } from '../../mocks/users';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Users, Ban, CheckCircle } from 'lucide-react';

export const UserManagementPage = () => {
  const [query, setQuery] = useState('');

  const filtered = MOCK_USERS.filter(
    (u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())
  );

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
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
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
