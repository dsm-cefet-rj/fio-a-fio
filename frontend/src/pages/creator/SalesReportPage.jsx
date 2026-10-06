import React from 'react';
import { getSalesReport } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { useRole } from '../../context/RoleContext';
import { StatCard } from '../../components/ui/StatCard';
import { DataTable } from '../../components/ui/DataTable';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ShieldCheck } from 'lucide-react';

export const SalesReportPage = () => {
  const { currentUser } = useRole();
  const { data: salesReport } = useApiData('salesReport', getSalesReport);
  const report = salesReport || { creatorNetShare: 0, totalGrossSales: 0, platformShare: 0, totalStudents: 0, recentSales: [] };

  const columns = [
    { header: 'ID / Data' },
    { header: 'Curso' },
    { header: 'Aluna' },
    { header: 'Valor Bruto' },
    { header: 'Seu Ganho (85%)' },
    { header: 'Status' },
  ];

  const salesList = currentUser?.id
    ? report.recentSales.filter(s => !s.creatorId || s.creatorId === currentUser.id)
    : report.recentSales;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="space-y-1">
        <span className="text-xs uppercase font-extrabold tracking-wider text-purple-600">
          Área Financeira • {currentUser?.name || 'Professora'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900">Relatório de Vendas & Receita</h1>
        <p className="text-xs text-zinc-500">Acompanhe seus rendimentos e repasses da plataforma Fio a Fio.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          variant="highlight"
          label="Sua Receita Líquida (85%)"
          value={`R$ ${Number(report.creatorNetShare || 0).toFixed(2).replace('.', ',')}`}
          subtext="Disponível para saque no PIX"
        />

        <StatCard
          label="Vendas Brutas Totais"
          value={`R$ ${Number(report.totalGrossSales || 0).toFixed(2).replace('.', ',')}`}
          subtext="Total transacionado no sistema"
        />

        <StatCard
          label="Repasse Plataforma (15%)"
          value={`R$ ${Number(report.platformShare || 0).toFixed(2).replace('.', ',')}`}
          subtext="Custos operacionais e taxas"
        />

        <StatCard
          label="Total de Alunos"
          value={report.totalStudents || 0}
          subtext="Alunas inscritas em seus cursos"
        />
      </div>

      {/* Revenue Split Callout */}
      <Card className="bg-purple-50/60 border-purple-100">
        <CardBody className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-purple-950 flex items-center gap-2">
              <ShieldCheck size={18} className="text-purple-600" />
              Modelo de Divisão de Receita (85% / 15%)
            </h3>
            <p className="text-xs text-purple-800 leading-relaxed max-w-2xl">
              Você fica com 85% do valor de cada venda efetuada de suas vídeo-aulas. A plataforma retém apenas 15% para cobrir o processamento de pagamentos, hospedagem dos vídeos e manutenção do sistema.
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Sales Table */}
      <DataTable
        title={`Vendas Recentes (${salesList.length})`}
        columns={columns}
        data={salesList}
        renderRow={(sale) => (
          <tr key={sale.id} className="hover:bg-rose-50/20">
            <td className="p-3.5">
              <span className="font-bold text-zinc-900">#{sale.id}</span>
              <p className="text-[10px] text-zinc-400">{sale.date}</p>
            </td>
            <td className="p-3.5 font-bold text-zinc-900">{sale.courseTitle}</td>
            <td className="p-3.5">{sale.buyerName}</td>
            <td className="p-3.5 text-zinc-600">R$ {Number(sale.grossAmount || 0).toFixed(2).replace('.', ',')}</td>
            <td className="p-3.5 font-extrabold text-purple-700">
              R$ {Number(sale.netAmount || 0).toFixed(2).replace('.', ',')}
            </td>
            <td className="p-3.5">
              <Badge variant="green" size="sm">{sale.status}</Badge>
            </td>
          </tr>
        )}
      />
    </div>
  );
};
