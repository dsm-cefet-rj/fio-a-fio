import React from 'react';
import { MOCK_VIDEO_LESSONS } from '../../mocks/videoLessons';
import { MOCK_MATERIALS } from '../../mocks/materials';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Layers, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContentManagementPage = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="space-y-1">
        <span className="text-xs uppercase font-extrabold tracking-wider text-rose-600">Painel de Moderação</span>
        <h1 className="text-2xl font-black text-zinc-900">Gestão de Conteúdos</h1>
        <p className="text-xs text-zinc-500">Curadoria de vídeo-aulas pagas e materiais gratuitos disponíveis na plataforma.</p>
      </div>

      {/* Videos Management */}
      <Card>
        <CardHeader>
          <h3 className="font-extrabold text-sm text-zinc-900">Vídeo-aulas no Sistema ({MOCK_VIDEO_LESSONS.length})</h3>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-rose-50">
            {MOCK_VIDEO_LESSONS.map((v) => (
              <div key={v.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={v.thumbnail} alt={v.title} className="w-16 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-zinc-900">{v.title}</h4>
                    <p className="text-[11px] text-zinc-500">Criadora: {v.creator.name} • Preço: R$ {v.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/videoaulas/${v.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                  </Link>
                  <Button variant="danger" size="sm" onClick={() => alert(`Curso "${v.title}" desativado.`)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Free Materials Management */}
      <Card>
        <CardHeader>
          <h3 className="font-extrabold text-sm text-zinc-900">Materiais Gratuitos ({MOCK_MATERIALS.length})</h3>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-rose-50">
            {MOCK_MATERIALS.map((m) => (
              <div key={m.id} className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-zinc-900">{m.title}</h4>
                  <p className="text-[11px] text-zinc-500">{m.type} • Autor: {m.author} • {m.downloadsCount} downloads</p>
                </div>
                <Button variant="danger" size="sm" onClick={() => alert(`Material "${m.title}" removido.`)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
