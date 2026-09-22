import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_VIDEO_LESSONS } from '../../mocks/videoLessons';
import { Card, CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';

export const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = MOCK_VIDEO_LESSONS.find((v) => v.id === id) || MOCK_VIDEO_LESSONS[0];

  const creatorShare = (lesson.price * 0.85).toFixed(2).replace('.', ',');
  const platformShare = (lesson.price * 0.15).toFixed(2).replace('.', ',');

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Link to={`/videoaulas/${lesson.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para a Vídeo-aula
      </Link>

      <Card className="shadow-lg border-rose-200">
        <CardHeader className="bg-rose-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-rose-500" size={20} />
            <h1 className="text-lg font-extrabold text-zinc-900">Resumo do Pedido</h1>
          </div>
          <p className="text-xs text-zinc-500">Etapa 1 de 3 — Confirmação de itens</p>
        </CardHeader>

        <CardBody className="space-y-6">
          {/* Item Card */}
          <div className="flex gap-4 p-3 bg-white rounded-2xl border border-rose-100">
            <img src={lesson.thumbnail} alt={lesson.title} className="w-24 h-20 rounded-xl object-cover" />
            <div className="flex-1 space-y-1">
              <span className="text-[10px] font-bold uppercase text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                {lesson.category}
              </span>
              <h3 className="font-bold text-sm text-zinc-900 line-clamp-1">{lesson.title}</h3>
              <p className="text-xs text-zinc-500">Por: {lesson.creator.name}</p>
              <p className="text-sm font-black text-zinc-900">
                R$ {lesson.price.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>

          {/* Revenue Model Callout */}
          <div className="p-4 bg-purple-50/70 border border-purple-100 rounded-2xl space-y-2 text-xs text-purple-950">
            <div className="flex items-center gap-2 font-bold text-purple-900">
              <ShieldCheck size={16} className="text-purple-600" />
              Modelo Transparente Fio a Fio
            </div>
            <p className="leading-relaxed">
              Deste valor, <b>85% (R$ {creatorShare})</b> vai diretamente para a professora <b>{lesson.creator.name}</b> e <b>15% (R$ {platformShare})</b> cobre a manutenção da plataforma.
            </p>
          </div>

          {/* Pricing breakdown */}
          <div className="space-y-2 pt-2 border-t border-rose-50 text-xs">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal do Curso</span>
              <span>R$ {lesson.price.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>Taxa de Processamento</span>
              <span className="text-emerald-600 font-bold">Grátis</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm text-zinc-900 pt-2 border-t border-rose-100">
              <span>Total a pagar</span>
              <span className="text-rose-600 text-lg">R$ {lesson.price.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </CardBody>

        <CardFooter>
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={() => navigate(`/pagamento/${lesson.id}`)}
          >
            Prosseguir para Pagamento
            <ArrowRight size={18} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
