import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_VIDEO_LESSONS } from '../../mocks/videoLessons';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, PlayCircle, BookOpen, ArrowRight } from 'lucide-react';

export const OrderConfirmationPage = () => {
  const { id } = useParams();
  const lesson = MOCK_VIDEO_LESSONS.find((v) => v.id === id) || MOCK_VIDEO_LESSONS[0];

  return (
    <div className="max-w-md mx-auto space-y-6 py-6">
      <Card className="text-center shadow-lg border-emerald-200">
        <CardBody className="p-8 space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={40} />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600">
              Pagamento Aprovado
            </span>
            <h1 className="text-2xl font-black text-zinc-900">Parabéns pela aquisição!</h1>
            <p className="text-xs text-zinc-500">
              O curso já foi liberado e adicionado à sua biblioteca pessoal.
            </p>
          </div>

          {/* Purchased Course Card */}
          <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 flex items-center gap-3 text-left">
            <img src={lesson.thumbnail} alt={lesson.title} className="w-16 h-16 rounded-xl object-cover" />
            <div>
              <p className="font-bold text-xs text-zinc-900 line-clamp-1">{lesson.title}</p>
              <p className="text-[11px] text-zinc-500">Por: {lesson.creator.name}</p>
              <p className="text-xs font-extrabold text-rose-600 mt-1">Acesso Vitalício</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link to={`/assistir/${lesson.id}`} className="block">
              <Button variant="primary" fullWidth size="lg">
                <PlayCircle size={18} />
                Começar a Assistir Agora
              </Button>
            </Link>

            <Link to="/biblioteca" className="block">
              <Button variant="outline" fullWidth size="md">
                <BookOpen size={16} />
                Ir para Minha Biblioteca
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
