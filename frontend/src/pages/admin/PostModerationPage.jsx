import React, { useState } from 'react';
import { getPosts, updateRecord } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { FileText, CheckCircle, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PostModerationPage = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState(null);
  const { data: posts = [], isLoading } = useApiData('adminPosts', () => getPosts({ includeRemoved: true }));

  const moderatePost = async (post, moderationStatus) => {
    const action = moderationStatus === 'removed' ? 'remover' : 'aprovar';
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
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="space-y-1">
        <span className="text-xs uppercase font-extrabold tracking-wider text-rose-600">Painel de Moderação</span>
        <h1 className="text-2xl font-black text-zinc-900">Moderação de Publicações</h1>
        <p className="text-xs text-zinc-500">Analise e gerencie todas as publicações reportadas ou ativas na comunidade.</p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-extrabold text-sm text-zinc-900">Feed de Publicações para Moderação</h3>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-rose-50">
            {posts.map((post) => (
              <div key={post.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-zinc-900">{post.author.name}</span>
                    <span className="text-[10px] text-zinc-400">• {post.timeAgo}</span>
                    <Badge variant="rose" size="sm">{post.category}</Badge>
                  </div>
                  <h4 className="font-bold text-sm text-zinc-900">{post.title}</h4>
                  <p className="text-xs text-zinc-600 line-clamp-2">{post.content}</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Link to={`/publicacao/${post.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                  </Link>
                  <Button variant="secondary" size="sm" onClick={() => alert(`Publicação #${post.id} aprovada!`)}>
                    <CheckCircle size={14} />
                    <span>Aprovar</span>
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => alert(`Publicação #${post.id} removida por violação das regras.`)}>
                    <Trash2 size={14} />
                    <span>Remover</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
