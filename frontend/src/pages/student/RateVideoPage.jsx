import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getVideoLessons } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { StarRating } from '../../components/ui/StarRating';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Star } from 'lucide-react';

export const RateVideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: lessons = [] } = useApiData('videoLessons', getVideoLessons);
  const lesson = lessons.find((v) => v.id === id) || lessons[0];
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  if (!lesson) return <p role="status">Carregando aula…</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Avaliação enviada com sucesso! Muito obrigado pelo seu feedback.');
    setTimeout(() => {
      navigate('/biblioteca');
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Link to="/biblioteca" className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para Minha Biblioteca
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Star className="text-amber-400 fill-amber-400" size={20} />
            <h1 className="text-lg font-extrabold text-zinc-900">Avaliar Vídeo-aula</h1>
          </div>
          <p className="text-xs text-zinc-500">Sua opinião é fundamental para a professora e para a comunidade.</p>
        </CardHeader>

        <CardBody className="space-y-4">
          <div className="p-3 bg-rose-50/50 rounded-2xl border border-rose-100 flex items-center gap-3">
            <img src={lesson.thumbnail} alt={lesson.title} className="w-14 h-14 rounded-xl object-cover" />
            <div>
              <p className="font-bold text-xs text-zinc-900 line-clamp-1">{lesson.title}</p>
              <p className="text-[11px] text-zinc-500">Professora: {lesson.creator.name}</p>
            </div>
          </div>

          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-center">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
                Sua Nota (1 a 5 estrelas)
              </label>
              <div className="flex justify-center">
                <StarRating rating={rating} interactive size={28} onChange={setRating} />
              </div>
            </div>

            <div className="text-left">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                Comentário ou Sugestão
              </label>
              <textarea
                rows={4}
                placeholder="O que você achou das explicações, qualidade de imagem e ritmo das aulas?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-800 outline-none focus:border-rose-400"
                required
              />
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg">
              Enviar Avaliação
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
