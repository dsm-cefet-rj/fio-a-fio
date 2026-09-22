import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_VIDEO_LESSONS } from '../../mocks/videoLessons';
import { Card, CardBody } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { StarRating } from '../../components/ui/StarRating';
import { ArrowLeft, Clock, ShoppingCart, CheckCircle, PlayCircle, Award } from 'lucide-react';

export const VideoDetailPage = () => {
  const { id } = useParams();
  const lesson = MOCK_VIDEO_LESSONS.find((v) => v.id === id) || MOCK_VIDEO_LESSONS[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/videoaulas" className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para o Catálogo de Vídeo-aulas
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img src={lesson.thumbnail} alt={lesson.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-zinc-950/30 flex items-center justify-center">
                <PlayCircle size={64} className="text-white drop-shadow-lg opacity-90 hover:scale-110 transition-transform cursor-pointer" />
              </div>
            </div>

            <CardBody className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="rose" size="sm">{lesson.category}</Badge>
                  <Badge variant="gray" size="sm">{lesson.level}</Badge>
                </div>
                <h1 className="text-2xl font-extrabold text-zinc-900">{lesson.title}</h1>
                <p className="text-sm text-zinc-600 font-medium">{lesson.subtitle}</p>
              </div>

              {/* Creator Info */}
              <div className="flex items-center gap-3 p-3 bg-rose-50/50 rounded-2xl border border-rose-100">
                <Avatar src={lesson.creator.avatar} alt={lesson.creator.name} size="md" />
                <div>
                  <p className="text-xs font-bold text-zinc-900">{lesson.creator.name}</p>
                  <p className="text-[11px] text-zinc-500">Criadora & Professora de Crochê</p>
                </div>
              </div>

              {/* Rating & Specs */}
              <div className="flex items-center gap-6 text-xs text-zinc-600 py-3 border-y border-rose-50">
                <div className="flex items-center gap-1.5 font-bold">
                  <StarRating rating={lesson.rating} size={16} />
                  <span>{lesson.rating} ({lesson.reviewsCount} avaliações)</span>
                </div>
                <div className="flex items-center gap-1 font-semibold">
                  <Clock size={16} className="text-rose-500" />
                  <span>{lesson.duration}</span>
                </div>
              </div>

              {/* Course Description */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-zinc-900 uppercase tracking-wider">Descrição Completa</h3>
                <p className="text-sm text-zinc-700 leading-relaxed">{lesson.description}</p>
              </div>

              {/* What You Will Learn */}
              {lesson.whatYouWillLearn && (
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-rose-100">
                  <h3 className="font-bold text-sm text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                    <Award size={18} className="text-rose-500" />
                    O que você vai aprender
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 font-medium">
                    {lesson.whatYouWillLearn.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Purchase Sticky Sidebar */}
        <div className="space-y-6">
          <Card className="sticky top-20 border-rose-200 shadow-md">
            <CardBody className="p-6 space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs uppercase font-bold text-zinc-400">Preço de Acesso Vitalício</span>
                <div className="text-3xl font-black text-rose-600">
                  R$ {lesson.price.toFixed(2).replace('.', ',')}
                </div>
                <p className="text-[11px] text-zinc-500">Pagamento único • Acesso imediato no painel</p>
              </div>

              <Link to={`/compra/${lesson.id}`} className="block">
                <Button variant="primary" fullWidth size="lg" className="shadow-md">
                  <ShoppingCart size={18} />
                  Comprar Vídeo-aula
                </Button>
              </Link>

              <div className="pt-4 border-t border-rose-50 space-y-2 text-xs text-zinc-600">
                <p className="flex items-center gap-2 font-semibold">
                  <CheckCircle size={14} className="text-rose-500" />
                  Assista no celular, tablet ou computador
                </p>
                <p className="flex items-center gap-2 font-semibold">
                  <CheckCircle size={14} className="text-rose-500" />
                  Suporte a dúvidas com a professora
                </p>
                <p className="flex items-center gap-2 font-semibold">
                  <CheckCircle size={14} className="text-rose-500" />
                  Divisão transparente: 85% para o criador
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
