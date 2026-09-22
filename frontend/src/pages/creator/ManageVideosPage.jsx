import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_VIDEO_LESSONS } from '../../mocks/videoLessons';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PlusCircle, Edit, Trash2, Eye, DollarSign, Sparkles } from 'lucide-react';

export const ManageVideosPage = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider text-white mb-2">
            <Sparkles size={14} />
            Painel do Criador
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Minhas Vídeo-aulas</h1>
          <p className="text-xs text-purple-100 mt-1">Gerencie seu catálogo de cursos, altere preços e cadastre novas vídeo-aulas.</p>
        </div>
        <Link to="/criador/videoaulas/cadastrar">
          <Button variant="secondary" size="md" className="bg-white text-purple-900 hover:bg-purple-50 border-none">
            <PlusCircle size={16} />
            <span>Cadastrar Nova Aula</span>
          </Button>
        </Link>
      </div>

      {/* Videos List Table / Cards */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-zinc-900">Catálogo Publicado ({MOCK_VIDEO_LESSONS.length})</h3>
          <span className="text-xs text-zinc-500">Divisão: 85% Criador / 15% Plataforma</span>
        </CardHeader>

        <CardBody className="p-0">
          <div className="divide-y divide-rose-50">
            {MOCK_VIDEO_LESSONS.map((lesson) => (
              <div key={lesson.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-rose-50/20 transition-colors">
                <div className="flex items-center gap-4">
                  <img src={lesson.thumbnail} alt={lesson.title} className="w-20 h-16 rounded-xl object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="purple" size="sm">{lesson.category}</Badge>
                      <span className="text-xs text-zinc-400">• {lesson.studentsCount || 100} alunos</span>
                    </div>
                    <h4 className="font-bold text-sm text-zinc-900 line-clamp-1 mt-0.5">{lesson.title}</h4>
                    <p className="text-xs font-extrabold text-rose-600">
                      R$ {lesson.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Link to={`/videoaulas/${lesson.id}`}>
                    <Button variant="ghost" size="sm" title="Visualizar página pública">
                      <Eye size={16} />
                    </Button>
                  </Link>
                  <Link to={`/criador/videoaulas/editar/${lesson.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit size={14} />
                      <span>Editar</span>
                    </Button>
                  </Link>
                  <Button variant="danger" size="sm" onClick={() => alert(`Simulação: Aula "${lesson.title}" excluída.`)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
