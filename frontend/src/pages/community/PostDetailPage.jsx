import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_POSTS } from '../../mocks/posts';
import { Card, CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Heart, MessageCircle, ArrowLeft, Send } from 'lucide-react';
import { useRole } from '../../context/RoleContext';

export const PostDetailPage = () => {
  const { id } = useParams();
  const { currentUser } = useRole();
  const post = MOCK_POSTS.find((p) => p.id === id) || MOCK_POSTS[0];

  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added = {
      id: `c-${Date.now()}`,
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      text: newComment,
      timeAgo: 'Agora mesmo'
    };

    setComments([...comments, added]);
    setNewComment('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Link to="/feed" className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para o Feed
      </Link>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={post.author.avatar} alt={post.author.name} size="md" />
            <div>
              <p className="font-bold text-sm text-zinc-900">{post.author.name}</p>
              <p className="text-xs text-zinc-500">{post.timeAgo} • @{post.author.username}</p>
            </div>
          </div>
        </CardHeader>

        <CardBody className="space-y-4">
          <h1 className="text-xl font-bold text-zinc-900">{post.title}</h1>
          <p className="text-sm text-zinc-700 leading-relaxed">{post.content}</p>
          {post.image && (
            <img src={post.image} alt={post.title} className="w-full rounded-2xl border border-rose-100 object-cover max-h-[450px]" />
          )}
        </CardBody>

        <CardFooter className="flex items-center justify-between">
          <Button
            variant={isLiked ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => {
              setIsLiked(!isLiked);
              setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
            }}
          >
            <Heart size={16} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />
            <span>{likesCount} Curtidas</span>
          </Button>
          <span className="text-xs font-semibold text-zinc-500">{comments.length} Comentários</span>
        </CardFooter>
      </Card>

      {/* Seção de Comentários */}
      <Card>
        <CardHeader>
          <h3 className="font-bold text-sm text-zinc-900 flex items-center gap-2">
            <MessageCircle size={16} />
            Comentários da Comunidade
          </h3>
        </CardHeader>

        <CardBody className="space-y-4">
          {/* Formulário Novo Comentário */}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <Avatar src={currentUser.avatar} size="sm" />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Escreva um comentário carinhoso..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 bg-zinc-50 border border-rose-100 rounded-xl px-3 py-2 text-xs outline-none focus:border-rose-400"
              />
              <Button type="submit" variant="primary" size="sm">
                <Send size={14} />
              </Button>
            </div>
          </form>

          {/* Lista de Comentários */}
          <div className="divide-y divide-rose-50 pt-2">
            {comments.map((comment) => (
              <div key={comment.id} className="py-3 flex gap-3">
                <Avatar src={comment.author.avatar} size="sm" />
                <div className="flex-1 bg-rose-50/50 p-3 rounded-2xl border border-rose-100/50">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-zinc-900">{comment.author.name}</span>
                    <span className="text-[10px] text-zinc-400">{comment.timeAgo}</span>
                  </div>
                  <p className="text-xs text-zinc-700 mt-1 leading-relaxed">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
