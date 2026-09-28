import React, { useState, useEffect } from 'react';
import { StoryBar } from '../../components/community/StoryBar';
import { PostCard } from '../../components/community/PostCard';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { CreatePostModal } from '../../components/community/CreatePostModal';
import { MOCK_POSTS } from '../../mocks/posts';
import { PlusCircle } from 'lucide-react';
import { useRole } from '../../context/RoleContext';

export const FeedPage = () => {
  const { currentUser } = useRole();
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

  return (
    <div className="max-w-2xl mx-auto space-y-6 relative">
      <PageHeader
        eyebrow={`Bom dia, ${currentUser.name || 'Ana'}`}
        title="Seu cantinho de inspiração"
        subtitle="Acompanhe quem transforma fios em histórias."
        variant="rose"
      >
        <Button
          variant="dark"
          size="sm"
          onClick={() => setIsCreatePostOpen(true)}
          className="shadow-md rounded-full px-4"
        >
          <PlusCircle size={16} />
          <span className="hidden sm:inline">Criar Publicação</span>
        </Button>
      </PageHeader>

      <StoryBar />

      <div className="space-y-4">
        {MOCK_POSTS.map((post) => (
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
