import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMaterials } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Download, FileText, Calendar, User, HardDrive } from 'lucide-react';

export const MaterialDetailPage = () => {
  const { id } = useParams();
  const { data: materials = [] } = useApiData('materials', getMaterials);
  const material = materials.find((m) => m.id === id) || materials[0];
  if (!material) return <p role="status">Carregando material…</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Link to="/materiais" className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para Materiais Gratuitos
      </Link>

      <Card>
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img src={material.thumbnail} alt={material.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
            <Badge variant="green" size="lg" className="shadow-md">
              GRATUITO
            </Badge>
          </div>
        </div>

        <CardBody className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-600">
              <FileText size={14} />
              <span>{material.type} • {material.category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">{material.title}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-500 py-3 border-y border-rose-50">
            <span className="flex items-center gap-1.5 font-semibold text-zinc-700">
              <User size={14} className="text-rose-500" />
              Por: {material.author}
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-zinc-700">
              <Calendar size={14} className="text-rose-500" />
              {material.date}
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-zinc-700">
              <HardDrive size={14} className="text-rose-500" />
              Tamanho: {material.fileSize}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-zinc-900 uppercase tracking-wider">Sobre este material</h3>
            <p className="text-sm text-zinc-700 leading-relaxed">{material.description}</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
            <div>
              <p className="font-bold text-sm text-zinc-900">Faça o download gratuito</p>
              <p className="text-xs text-zinc-500">{material.downloadsCount} artesãos já baixaram este arquivo.</p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => alert(`Simulação: Iniciando download de "${material.title}"`)}
            >
              <Download size={18} />
              Baixar Agora ({material.fileSize})
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
