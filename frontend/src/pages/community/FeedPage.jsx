import React, { useState } from 'react';
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
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-6 relative animate-fade-in">
      <PageHeader
        eyebrow={`Bem-vinda, ${currentUser.name || 'Ana'}`}
        title="Seu cantinho de inspiração"
        subtitle="Acompanhe quem transforma fios e agulhas em histórias tecidas com carinho."
        variant="rose"
      >
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsCreatePostOpen(true)}
          className="shadow-md rounded-full px-4 text-xs font-extrabold bg-[#E55B86] hover:bg-[#D24471]"
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

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
    </div>
  );
};

