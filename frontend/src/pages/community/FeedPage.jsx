import React, { useState } from 'react';
import { StoryBar } from '../../components/community/StoryBar';
import { PostCard } from '../../components/community/PostCard';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { CreatePostModal } from '../../components/community/CreatePostModal';
import { getPosts } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { PlusCircle } from 'lucide-react';
import { useRole } from '../../context/RoleContext';

export const FeedPage = () => {
  const { currentUser, currentRole } = useRole();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const { data: posts = [] } = useApiData('posts', getPosts);

  const greeting = currentRole === 'guest'
    ? 'Bem-vinda à Comunidade Fio a Fio'
    : `Bem-vinda, ${currentUser.name || 'Crocheteira'}`;

  return (
    <div className="max-w-2xl mx-auto space-y-6 relative animate-fade-in">
      <PageHeader
        eyebrow={greeting}
        title="Seu cantinho de inspiração"
        subtitle="Acompanhe quem transforma fios e agulhas em histórias tecidas com carinho."
        variant="rose"
      >
        {currentRole !== 'guest' && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreatePostOpen(true)}
            className="shadow-md rounded-full px-4 text-xs font-extrabold bg-[#B94F70] hover:bg-[#963B58]"
          >
            <PlusCircle size={16} />
            <span className="hidden sm:inline">Criar Publicação</span>
          </Button>
        )}
      </PageHeader>

      <StoryBar />

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
    </div>
  );
};
