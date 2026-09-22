import React from 'react';
import { MOCK_SALES_SUMMARY } from '../../mocks/sales';
import { StatCard } from '../../components/ui/StatCard';
import { DataTable } from '../../components/ui/DataTable';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ShieldCheck } from 'lucide-react';

export const SalesReportPage = () => {
  const columns = [
    { header: 'ID / Data' },
    { header: 'Curso' },
    { header: 'Aluna' },
    { header: 'Valor Bruto' },
    { header: 'Seu Ganho (85%)' },
    { header: 'Status' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="space-y-1">
        <span className="text-xs uppercase font-extrabold tracking-wider text-purple-600">Área Financeira</span>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900">Relatório de Vendas & Receita</h1>
        <p className="text-xs text-zinc-500">Acompanhe seus rendimentos e repasses da plataforma Fio a Fio.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          variant="highlight"
          label="Sua Receita Líquida (85%)"
          value={`R$ ${MOCK_SALES_SUMMARY.creatorNetShare.toFixed(2).replace('.', ',')}`}
          subtext="Disponível para saque no PIX"
        />

        <StatCard
          label="Vendas Brutas Totais"
          value={`R$ ${MOCK_SALES_SUMMARY.totalGrossSales.toFixed(2).replace('.', ',')}`}
          subtext="Total transacionado no sistema"
        />

        <StatCard
          label="Repasse Plataforma (15%)"
          value={`R$ ${MOCK_SALES_SUMMARY.platformShare.toFixed(2).replace('.', ',')}`}
          subtext="Custos operacionais e taxas"
        />

        <StatCard
          label="Total de Alunos"
          value={MOCK_SALES_SUMMARY.totalStudents}
          subtext="+18 novos este mês"
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
        title="Vendas Recentes"
        columns={columns}
        data={MOCK_SALES_SUMMARY.recentSales}
        renderRow={(sale) => (
          <tr key={sale.id} className="hover:bg-rose-50/20">
            <td className="p-3.5">
              <span className="font-bold text-zinc-900">#{sale.id}</span>
              <p className="text-[10px] text-zinc-400">{sale.date}</p>
            </td>
            <td className="p-3.5 font-bold text-zinc-900">{sale.courseTitle}</td>
            <td className="p-3.5">{sale.buyerName}</td>
            <td className="p-3.5 text-zinc-600">R$ {sale.grossAmount.toFixed(2).replace('.', ',')}</td>
            <td className="p-3.5 font-extrabold text-purple-700">
              R$ {sale.netAmount.toFixed(2).replace('.', ',')}
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
