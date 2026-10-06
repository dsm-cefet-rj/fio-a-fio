import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getVideoLessons, updateRecord } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';

export const EditVideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: lessons = [] } = useApiData('videoLessons', getVideoLessons);
  const lesson = lessons.find((v) => v.id === id);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!lesson) return;
    setTitle(lesson.title || '');
    setPrice(lesson.price || '');
    setDescription(lesson.description || '');
  }, [lesson]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateRecord('videoLessons', id, { title, price: Number(price), description });
    await queryClient.invalidateQueries({ queryKey: ['videoLessons'] });
    setMessage('Informações da vídeo-aula atualizadas!');
    setTimeout(() => {
      navigate('/criador/videoaulas');
    }, 800);
  };

  if (!lesson) return <p role="status">Carregando aula…</p>;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <Link to="/criador/videoaulas" className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para Minhas Aulas
      </Link>

      <Card>
        <CardHeader>
          <h1 className="text-lg font-extrabold text-zinc-900">Editar Vídeo-aula</h1>
          <p className="text-xs text-zinc-500">Altere o preço, descrição ou conteúdo do curso.</p>
        </CardHeader>

        <CardBody className="space-y-4">
          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Título do Curso"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Input
              label="Preço do Curso (R$)"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                Descrição
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-800 outline-none focus:border-rose-400"
              />
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg">
              <Save size={18} />
              Salvar Alterações
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
