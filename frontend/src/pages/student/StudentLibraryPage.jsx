import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PURCHASES } from '../../mocks/purchases';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Library, PlayCircle, Star, ShoppingBag } from 'lucide-react';

export const StudentLibraryPage = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-8 text-white shadow-lg flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider text-white mb-2">
            <Library size={14} />
            Área do Aluno
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Minha Biblioteca de Cursos</h1>
          <p className="text-xs text-rose-100 mt-1">Todas as vídeo-aulas adquiridas ficam salvas aqui para você assistir quando quiser.</p>
        </div>
        <Link to="/compras">
          <Button variant="dark" size="sm">
            <ShoppingBag size={14} />
            <span> Histórico de Compras</span>
          </Button>
        </Link>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_PURCHASES.map((item) => (
          <Card key={item.id} hoverable className="flex flex-col justify-between">
            <div>
              <div className="relative h-44 overflow-hidden">
                <img src={item.lesson.thumbnail} alt={item.lesson.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-zinc-950/20 flex items-center justify-center">
                  <PlayCircle size={48} className="text-white drop-shadow-md" />
                </div>
              </div>

              <CardBody className="space-y-3">
                <p className="text-xs font-semibold text-rose-600">Professora: {item.lesson.creatorName}</p>
                <h3 className="font-bold text-base text-zinc-900 line-clamp-1">{item.lesson.title}</h3>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-zinc-500 font-semibold">
                    <span>Progresso do Curso</span>
                    <span>{item.lesson.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{ width: `${item.lesson.progressPercent}%` }}
                    />
                  </div>
                </div>
              </CardBody>
            </div>

            <div className="p-4 bg-rose-50/40 border-t border-rose-50 flex items-center justify-between gap-2">
              <Link to={`/avaliacao/${item.lesson.id}`}>
                <Button variant="ghost" size="sm" className="text-zinc-600">
                  <Star size={14} />
                  <span>Avaliar</span>
                </Button>
              </Link>
              <Link to={`/assistir/${item.lesson.id}`}>
                <Button variant="primary" size="sm">
                  <PlayCircle size={16} />
                  <span>Continuar Aula</span>
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
