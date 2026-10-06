import React from 'react';
import { getAdminDashboard, getUsers, getPosts, getVideoLessons } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ShieldAlert, Users, Video, FileText, DollarSign, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardPage = () => {
  const { data: adminStats } = useApiData('adminDashboard', getAdminDashboard);
  const { data: users = [] } = useApiData('users', getUsers);
  const { data: posts = [] } = useApiData('posts', getPosts);
  const { data: lessons = [] } = useApiData('videoLessons', getVideoLessons);

  const stats = adminStats || {
    totalUsers: 0,
    activeCreators: 0,
    publishedCourses: 0,
    totalPosts: 0,
    pendingModerationPosts: 0,
    platformRevenueMonth: 0,
    reportedPosts: [],
    recentUsers: []
  };

  // Prioritize real data from db.json collections
  const totalUsersCount = users.length > 0 ? users.length : stats.totalUsers;
  const activeCreatorsCount = users.length > 0 ? users.filter(u => u.role === 'creator').length : stats.activeCreators;
  const activeLessons = lessons.filter((lesson) => lesson.isActive !== false);
  const publishedCoursesCount = lessons.length > 0 ? activeLessons.length : stats.publishedCourses;
  const totalPostsCount = posts.length > 0 ? posts.length : stats.totalPosts;
  const recentUsersList = users.length > 0 ? users.slice(-5).reverse() : stats.recentUsers;

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
          value={totalUsersCount.toLocaleString()}
          subtext={`${activeCreatorsCount} criadores ativos`}
          icon={Users}
        />

        <StatCard
          label="Cursos Publicados"
          value={publishedCoursesCount}
          subtext="Aulas ativas na loja"
          icon={Video}
        />

        <StatCard
          label="Publicações Totais"
          value={totalPostsCount.toLocaleString()}
          subtext={`${stats.pendingModerationPosts} em análise`}
          icon={FileText}
        />

        <StatCard
          label="Receita Plataforma (15%)"
          value={`R$ ${stats.platformRevenueMonth.toFixed(2).replace('.', ',')}`}
          subtext="Faturamento no mês"
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-zinc-900 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              Denúncias Pendentes ({stats.reportedPosts.length})
            </h3>
            <Link to="/admin/publicacoes" className="text-xs font-bold text-rose-600 hover:underline">
              Ver Todas →
            </Link>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-rose-50">
              {stats.reportedPosts.map((rep) => (
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
              {recentUsersList.map((usr) => (
                <div key={usr.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-xs text-zinc-900">{usr.name}</p>
                    <p className="text-[11px] text-zinc-500">@{usr.username || usr.id} • {usr.email} • Perfil: {usr.role}</p>
                  </div>
                  <Badge variant="green" size="sm">Ativo</Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
