import React, { useState, useEffect } from 'react';
import { X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Vestuário');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Publicação criada com sucesso!');
    setTimeout(() => {
      if (onPostCreated) onPostCreated();
      setTitle('');
      setContent('');
      setImageUrl('');
      setMessage('');
      onClose();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-[100] w-screen h-screen min-h-screen flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-2xl backdrop-saturate-150 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-100 bg-rose-50/50">
          <div className="flex items-center gap-2">
            <Sparkles className="text-rose-500" size={20} />
            <h2 className="text-lg font-extrabold text-zinc-900">Nova Publicação</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-rose-100/80 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs text-zinc-500">Compartilhe seus trabalhos, ideias e inspire a comunidade de crochê.</p>

          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl text-center animate-fadeIn">
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
                className="w-full bg-white border border-rose-200 rounded-2xl px-3.5 py-2.5 text-xs text-zinc-800 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all"
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
                className="w-full bg-white border border-rose-200 rounded-2xl p-3.5 text-xs text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all"
                required
              />
            </div>

            <Input
              label="URL da Imagem (Opcional)"
              icon={ImageIcon}
              placeholder="https://exemplo.com/minha-foto.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              helperText="Cole um link direto de foto do seu trabalho para ilustrar a publicação."
            />

            <div className="pt-2">
              <Button type="submit" variant="primary" fullWidth size="lg" className="rounded-2xl font-bold shadow-md">
                Publicar no Feed
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
