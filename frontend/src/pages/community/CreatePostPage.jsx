import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Image, Sparkles } from 'lucide-react';

export const CreatePostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Vestuário');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Publicação criada com sucesso! Redirecionando...');
    setTimeout(() => {
      navigate('/feed');
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Link to="/feed" className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para o Feed
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="text-rose-500" size={20} />
            <h1 className="text-lg font-extrabold text-zinc-900">Nova Publicação</h1>
          </div>
          <p className="text-xs text-zinc-500">Compartilhe seus projetos e inspire a comunidade de crochê.</p>
        </CardHeader>

        <CardBody className="space-y-4">
          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Título da Publicação"
              placeholder="Ex: Meu novo cardigan em granny squares"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-800 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
              >
                <option value="Vestuário">Vestuário</option>
                <option value="Amigurumi">Amigurumi</option>
                <option value="Decoração">Decoração</option>
                <option value="Acessórios">Acessórios</option>
                <option value="Dicas & Tutoriais">Dicas & Tutoriais</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                Descrição / Conteúdo
              </label>
              <textarea
                rows={4}
                placeholder="Conte sobre o projeto, materiais utilizados, tempo de confecção ou faça uma pergunta..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl p-3.5 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
                required
              />
            </div>

            <Input
              label="URL da Imagem (Opcional)"
              icon={Image}
              placeholder="https://exemplo.com/minha-foto.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              helperText="Cole um link direto de foto do seu trabalho para ilustrar a publicação."
            />

            <Button type="submit" variant="primary" fullWidth size="lg">
              Publicar no Feed
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
