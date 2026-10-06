import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useRole } from '../../context/RoleContext';
import { createRecord } from '../../services/api';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Video, DollarSign, UploadCloud, Sparkles } from 'lucide-react';

export const CreateVideoPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useRole();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 'Vestuário',
    price: '',
    level: 'Iniciante',
    duration: '',
    description: '',
    thumbnail: '',
    videoUrl: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { videoUrl, ...lesson } = formData;
    await createRecord('videoLessons', {
      ...lesson,
      price: Number(formData.price),
      creatorId: currentUser.id,
      creatorBio: currentUser.bio,
      thumbnail: formData.thumbnail,
      videoUrl,
      rating: 0,
      reviewsCount: 0,
      studentsCount: 0,
      requirements: [],
      whatYouWillLearn: [],
      modules: [],
    });
    await queryClient.invalidateQueries({ queryKey: ['videoLessons'] });
    setMessage('Vídeo-aula cadastrada com sucesso! Ela já está disponível no catálogo.');
    setTimeout(() => {
      navigate('/criador/videoaulas');
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Link to="/criador/videoaulas" className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para Minhas Aulas
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="text-purple-600" size={20} />
            <h1 className="text-lg font-extrabold text-zinc-900">Cadastrar Nova Vídeo-aula</h1>
          </div>
          <p className="text-xs text-zinc-500">Disponibilize um novo curso pago para a comunidade.</p>
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
              placeholder="Ex: Manta de Crochê em Ponto Pipoca"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <Input
              label="Subtítulo / Resumo"
              placeholder="Ex: Aprenda do zero a criar peças de decoração aconchegantes."
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                  Categoria
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-rose-400"
                >
                  <option value="Vestuário">Vestuário</option>
                  <option value="Acessórios">Acessórios</option>
                  <option value="Decoração">Decoração</option>
                  <option value="Amigurumi">Amigurumi</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                  Nível
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-rose-400"
                >
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>

              <Input
                label="Preço (R$)"
                type="number"
                step="0.01"
                placeholder="49.90"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-900 font-medium">
              💡 Lembre-se: Você receberá <b>85% do valor</b> de cada venda realizada (15% repassado à plataforma).
            </div>

            <Input
              label="Duração Total Estimada"
              placeholder="Ex: 2h 30min"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                Descrição Detalhada do Curso
              </label>
              <textarea
                rows={4}
                placeholder="Explique o que o aluno vai aprender, lista de materiais recomendados, técnicas utilizadas..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white border border-zinc-200 rounded-xl p-3.5 text-sm text-zinc-800 outline-none focus:border-rose-400"
                required
              />
            </div>

            <Input
              label="URL da Capa / Thumbnail"
              placeholder="https://exemplo.com/capa.jpg"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              required
            />

            <Input
              label="URL do Vídeo Principal (MP4 ou Embed)"
              placeholder="https://exemplo.com/aula.mp4"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              required
            />

            <Button type="submit" variant="primary" fullWidth size="lg">
              <UploadCloud size={18} />
              Publicar Vídeo-aula no Catálogo
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
