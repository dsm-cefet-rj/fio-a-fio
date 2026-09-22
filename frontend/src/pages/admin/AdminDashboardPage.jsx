import React from 'react';
import { MOCK_ADMIN_STATS } from '../../mocks/adminStats';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ShieldAlert, Users, Video, FileText, DollarSign, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardPage = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <PageHeader
        eyebrow="Administração Fio a Fio"
        title="Painel Geral de Moderação"
        subtitle="Acompanhe métricas de uso, relatórios de moderação e movimentação financeira da plataforma."
        icon={ShieldAlert}
        variant="dark"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total de Usuários"
          value={MOCK_ADMIN_STATS.totalUsers.toLocaleString()}
          subtext={`${MOCK_ADMIN_STATS.activeCreators} criadores ativos`}
          icon={Users}
        />

        <StatCard
          label="Cursos Publicados"
          value={MOCK_ADMIN_STATS.publishedCourses}
          subtext="Aulas ativas na loja"
          icon={Video}
        />

        <StatCard
          label="Publicações Totais"
          value={MOCK_ADMIN_STATS.totalPosts.toLocaleString()}
          subtext={`${MOCK_ADMIN_STATS.pendingModerationPosts} em análise`}
          icon={FileText}
        />

        <StatCard
          label="Receita Plataforma (15%)"
          value={`R$ ${MOCK_ADMIN_STATS.platformRevenueMonth.toFixed(2).replace('.', ',')}`}
          subtext="Faturamento no mês"
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-zinc-900 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              Denúncias Pendentes ({MOCK_ADMIN_STATS.reportedPosts.length})
            </h3>
            <Link to="/admin/publicacoes" className="text-xs font-bold text-rose-600 hover:underline">
              Ver Todas →
            </Link>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-rose-50">
              {MOCK_ADMIN_STATS.reportedPosts.map((rep) => (
                <div key={rep.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-xs text-zinc-900">{rep.postTitle}</p>
                    <p className="text-[11px] text-zinc-500">Autor: @{rep.author} • Motivo: <span className="text-red-500 font-semibold">{rep.reason}</span></p>
                  </div>
                  <Badge variant="amber" size="sm">Em Análise</Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-zinc-900">Novos Cadastros</h3>
            <Link to="/admin/usuarios" className="text-xs font-bold text-rose-600 hover:underline">
              Gerenciar →
            </Link>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-rose-50">
              {MOCK_ADMIN_STATS.recentUsers.map((usr) => (
                <div key={usr.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-xs text-zinc-900">{usr.name}</p>
                    <p className="text-[11px] text-zinc-500">{usr.email} • Perfil: {usr.role}</p>
                  </div>
                  <Badge variant="green" size="sm">{usr.status}</Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
