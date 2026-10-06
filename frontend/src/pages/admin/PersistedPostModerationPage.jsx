import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { CheckCircle, Eye, Trash2, RotateCcw } from 'lucide-react';
import { getPosts, updateRecord } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const PersistedPostModerationPage = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState(null);
  const { data: posts = [], isLoading } = useApiData('adminPosts', () => getPosts({ includeRemoved: true }));

  const setStatus = async (post, moderationStatus) => {
    const action = moderationStatus === 'removed' ? 'remover' : post.moderationStatus === 'removed' ? 'restaurar' : 'aprovar';
    if (!window.confirm(`Deseja ${action} a publicação "${post.title}"?`)) return;
    setProcessingId(post.id);
    setError('');
    try {
      await updateRecord('posts', post.id, { moderationStatus, moderatedAt: new Date().toISOString() });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['adminPosts'] }),
        queryClient.invalidateQueries({ queryKey: ['posts'] }),
      ]);
    } catch {
      setError('Não foi possível salvar a moderação. Verifique se o JSON Server está ativo.');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="space-y-1">
        <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">Painel de Moderação</span>
        <h1 className="text-2xl font-black text-zinc-900">Moderação de Publicações</h1>
        <p className="text-xs text-zinc-500">Aprove, remova ou restaure publicações. As alterações ficam salvas no banco local.</p>
      </header>
      <Card>
        <CardHeader><h2 className="text-sm font-extrabold text-zinc-900">Publicações ({posts.length})</h2></CardHeader>
        <CardBody className="space-y-3 p-3 sm:p-5">
          {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{error}</p>}
          {isLoading && <p role="status" className="p-5 text-center text-sm text-zinc-500">Carregando publicações...</p>}
          {!isLoading && posts.length === 0 && <p className="p-5 text-center text-sm text-zinc-500">Não há publicações para moderar.</p>}
          {posts.map((post) => {
            const removed = post.moderationStatus === 'removed';
            const approved = post.moderationStatus !== 'pending' && post.moderationStatus !== 'removed';
            return (
              <article key={post.id} className="space-y-3 rounded-2xl border border-rose-100 p-4 sm:flex sm:items-start sm:justify-between sm:gap-5">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="break-words text-xs font-bold text-zinc-900">{post.author?.name || 'Usuário indisponível'}</span>
                    <span className="text-[10px] text-zinc-400">{post.timeAgo}</span>
                    <Badge variant={removed ? 'gray' : approved ? 'green' : 'amber'} size="sm">{removed ? 'Removida' : approved ? 'Aprovada' : 'Em revisão'}</Badge>
                  </div>
                  <p className="text-[10px] font-semibold text-rose-700">{post.category}</p>
                  <h3 className="break-words text-sm font-bold text-zinc-900">{post.title}</h3>
                  <p className="break-words text-xs text-zinc-600 line-clamp-3">{post.content}</p>
                </div>
                <div className="flex w-full flex-wrap justify-end gap-2 sm:w-auto sm:shrink-0">
                  {!removed && approved && <Link to={`/publicacao/${post.id}`}><Button variant="ghost" size="sm" aria-label="Visualizar publicação"><Eye size={16} /></Button></Link>}
                  {removed ? (
                    <Button variant="secondary" size="sm" disabled={processingId === post.id} onClick={() => setStatus(post, 'approved')}>
                      <RotateCcw size={14} /><span>{processingId === post.id ? 'Salvando...' : 'Restaurar'}</span>
                    </Button>
                  ) : (
                    <>
                      <Button variant="secondary" size="sm" disabled={processingId === post.id || approved} onClick={() => setStatus(post, 'approved')}>
                        <CheckCircle size={14} /><span>{processingId === post.id ? 'Salvando...' : approved ? 'Aprovada' : 'Aprovar'}</span>
                      </Button>
                      <Button variant="danger" size="sm" disabled={processingId === post.id} onClick={() => setStatus(post, 'removed')}>
                        <Trash2 size={14} /><span>{processingId === post.id ? 'Salvando...' : 'Remover'}</span>
                      </Button>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </CardBody>
      </Card>
    </div>
  );
};
