import React, { useState, useEffect } from 'react';
import { useRole } from '../../context/RoleContext';
import { Card, CardBody } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { PostCard } from '../../components/community/PostCard';
import { CreatePostModal } from '../../components/community/CreatePostModal';
import { MOCK_POSTS } from '../../mocks/posts';
import { MapPin, Calendar, Edit3, UserCheck, UserPlus, Grid, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProfilePage = () => {
  const { currentUser } = useRole();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setShowFloatingBtn(true);
      } else {
        setShowFloatingBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const myPosts = MOCK_POSTS.filter(
    (p) => p.author.username === currentUser.username || currentUser.role === 'creator'
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 relative">
      {/* Profile Header Card */}
      <Card>
        <div className="h-32 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 rounded-t-2xl" />
        <CardBody className="relative pt-0 px-6 pb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12">
            <Avatar
              src={currentUser.avatar}
              alt={currentUser.name}
              size="xl"
              className="shadow-md"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsCreatePostOpen(true)}
                className="rounded-xl shadow-sm"
              >
                <PlusCircle size={15} />
                <span>Criar Publicação</span>
              </Button>
              <Link to="/perfil/editar">
                <Button variant="outline" size="sm" className="rounded-xl">
                  <Edit3 size={14} />
                  <span>Editar Perfil</span>
                </Button>
              </Link>
              <Button
                variant={isFollowing ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setIsFollowing(!isFollowing)}
                className="rounded-xl"
              >
                {isFollowing ? <UserCheck size={14} /> : <UserPlus size={14} />}
                <span>{isFollowing ? 'Seguindo' : 'Seguir'}</span>
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-zinc-900">{currentUser.name}</h1>
              {currentUser.role === 'creator' && (
                <span className="bg-purple-100 text-purple-800 text-[11px] font-extrabold px-2 py-0.5 rounded-full border border-purple-200">
                  Criadora / Professora
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-500">@{currentUser.username}</p>
          </div>

          <p className="text-sm text-zinc-700 leading-relaxed max-w-xl">
            {currentUser.bio || 'Apaixonada por agulhas, linhas e por compartilhar a arte do crochê! 🧶✨'}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-1">
            {currentUser.location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-rose-500" />
                {currentUser.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar size={14} className="text-rose-500" />
              Membro desde {currentUser.joinedDate || '2024'}
            </span>
          </div>

          <div className="flex items-center gap-6 pt-3 border-t border-rose-50 text-xs">
            <div>
              <span className="font-extrabold text-zinc-900 text-sm">{currentUser.followersCount || 142}</span>{' '}
              <span className="text-zinc-500">Seguidores</span>
            </div>
            <div>
              <span className="font-extrabold text-zinc-900 text-sm">{currentUser.followingCount || 89}</span>{' '}
              <span className="text-zinc-500">Seguindo</span>
            </div>
            <div>
              <span className="font-extrabold text-zinc-900 text-sm">{myPosts.length}</span>{' '}
              <span className="text-zinc-500">Publicações</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Tabs */}
      <div className="flex border-b border-rose-100 bg-white rounded-2xl p-1 shadow-xs">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeTab === 'posts'
              ? 'bg-rose-100 text-rose-800 shadow-2xs'
              : 'text-zinc-600 hover:bg-rose-50'
          }`}
        >
          <Grid size={16} />
          <span>Publicações ({myPosts.length})</span>
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {myPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Floating Create Post Button on Scroll — Posicionado ACIMA do seletor de modo de usuário (RoleSwitcher) */}
      <div
        className={`fixed bottom-20 right-4 sm:right-6 z-40 transition-all duration-300 transform ${
          showFloatingBtn
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
            : 'opacity-0 translate-y-8 pointer-events-none scale-90'
        }`}
      >
        <button
          onClick={() => setIsCreatePostOpen(true)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-3 px-5 sm:py-3.5 sm:px-6 rounded-full shadow-xl shadow-rose-500/30 hover:shadow-2xl hover:scale-105 border border-white/40 backdrop-blur-md transition-all duration-200 group"
        >
          <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-xs sm:text-sm font-extrabold tracking-wide">Criar Publicação</span>
        </button>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
    </div>
  );
};
