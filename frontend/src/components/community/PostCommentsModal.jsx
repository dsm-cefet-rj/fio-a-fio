import React, { useState, useEffect } from 'react';
import { X, Send, Heart, MessageCircle, Sparkles } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { useRole } from '../../context/RoleContext';

export const PostCommentsModal = ({ isOpen, onClose, post, onCommentAdded }) => {
  const { currentUser } = useRole();
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (post) {
      setComments(post.comments || []);
      setIsLiked(post.isLiked || false);
      setLikesCount(post.likesCount || 0);
    }
  }, [post]);

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

  if (!isOpen || !post) return null;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newCommentObj = {
      id: `comment-${Date.now()}`,
      author: {
        name: currentUser?.name || 'Você',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      text: newCommentText.trim(),
      timeAgo: 'Agora mesmo'
    };

    const updatedComments = [...comments, newCommentObj];
    setComments(updatedComments);
    setNewCommentText('');
    setIsCommenting(false);

    if (onCommentAdded) {
      onCommentAdded(post.id, updatedComments);
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div
      className={`fixed inset-0 z-[100] w-screen h-screen min-h-screen flex items-center justify-center p-3 sm:p-6 transition-all duration-500 ease-out ${
        isCommenting
          ? 'bg-slate-950/85 backdrop-blur-3xl backdrop-saturate-150 backdrop-contrast-105'
          : 'bg-slate-950/70 backdrop-blur-2xl backdrop-saturate-150'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden flex flex-col max-h-[88vh] animate-scaleUp transition-all duration-300 ${
          isCommenting ? 'ring-4 ring-rose-400/50 shadow-rose-500/30 scale-[1.01]' : ''
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-100/80 bg-rose-50/60">
          <div className="flex items-center gap-3">
            <Avatar src={post.author.avatar} alt={post.author.name} size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-zinc-900">{post.author.name}</h3>
                {post.author.verified && (
                  <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                    Professora
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500">{post.timeAgo} • @{post.author.username}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-rose-100/80 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Post Snippet */}
          <div className="bg-rose-50/40 rounded-2xl p-4 border border-rose-100/60 space-y-2">
            <h4 className="font-bold text-sm text-zinc-900">{post.title}</h4>
            <p className="text-xs text-zinc-700 leading-relaxed">{post.content}</p>

            {post.image && (
              <div className="rounded-xl overflow-hidden border border-rose-100/80 max-h-56 mt-2">
                <img src={post.image} alt={post.title} className="w-full object-cover max-h-56" />
              </div>
            )}

            <div className="flex items-center justify-between pt-2 text-xs text-zinc-500 border-t border-rose-100/40 mt-3">
              <Button
                variant={isLiked ? 'secondary' : 'ghost'}
                size="sm"
                onClick={toggleLike}
                className="h-8 text-xs rounded-full"
              >
                <Heart size={14} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />
                <span>{likesCount} Curtidas</span>
              </Button>

              <span className="flex items-center gap-1 font-semibold text-rose-600">
                <MessageCircle size={14} />
                {comments.length} Comentários
              </span>
            </div>
          </div>

          {/* Comment Focus Helper Bar */}
          {isCommenting && (
            <div className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl text-xs font-medium animate-fadeIn shadow-md">
              <Sparkles size={14} className="animate-spin" />
              <span>Modo foco ativado: o fundo foi intensamente desfocado para você escrever seu comentário! 🧶</span>
            </div>
          )}

          {/* Comments List Header */}
          <div className="flex items-center justify-between pt-1">
            <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>Comentários</span>
              <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full text-[10px] font-extrabold">
                {comments.length}
              </span>
            </h4>
          </div>

          {/* Comments List */}
          {comments.length === 0 ? (
            <div className="text-center py-8 px-4 bg-rose-50/20 rounded-2xl border border-dashed border-rose-200/60 space-y-2">
              <span className="text-3xl block">💬</span>
              <p className="text-xs font-semibold text-zinc-700">Nenhum comentário ainda.</p>
              <p className="text-[11px] text-zinc-400">Seja o primeiro a compartilhar carinho e inspiração!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3 group">
                  <Avatar src={comment.author.avatar} size="sm" className="mt-0.5" />
                  <div className="flex-1 bg-rose-50/70 group-hover:bg-rose-50 p-3 rounded-2xl border border-rose-100/70 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-zinc-900">{comment.author.name}</span>
                      <span className="text-[10px] text-zinc-400 font-medium">{comment.timeAgo}</span>
                    </div>
                    <p className="text-xs text-zinc-700 mt-1 leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Comment Input Form */}
        <div className="p-4 border-t border-rose-100 bg-rose-50/40">
          <form onSubmit={handleAddComment} className="flex items-center gap-2">
            <Avatar src={currentUser?.avatar} size="sm" />
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Escreva um comentário carinhoso..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                onFocus={() => setIsCommenting(true)}
                onBlur={() => {
                  if (!newCommentText.trim()) {
                    setIsCommenting(false);
                  }
                }}
                className={`w-full bg-white border text-xs text-zinc-800 rounded-2xl px-4 py-2.5 pr-10 outline-none transition-all duration-200 ${
                  isCommenting
                    ? 'border-rose-400 ring-2 ring-rose-400/40 shadow-xs'
                    : 'border-rose-200 hover:border-rose-300'
                }`}
              />
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-40 disabled:hover:bg-rose-500 text-white rounded-xl transition-all"
                aria-label="Enviar comentário"
              >
                <Send size={13} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
