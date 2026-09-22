import React from 'react';
import { StoryBar } from '../../components/community/StoryBar';
import { PostCard } from '../../components/community/PostCard';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { MOCK_POSTS } from '../../mocks/posts';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';

export const FeedPage = () => {
  const { currentUser } = useRole();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        eyebrow={`Bom dia, ${currentUser.name || 'Ana'}`}
        title="Seu cantinho de inspiração"
        subtitle="Acompanhe quem transforma fios em histórias."
        variant="rose"
      >
        <Link to="/publicacao/criar">
          <Button variant="dark" size="sm" className="shadow-md">
            <PlusCircle size={16} />
            <span className="hidden sm:inline">Criar Publicação</span>
          </Button>
        </Link>
      </PageHeader>

      <StoryBar />

      <div className="space-y-4">
        {MOCK_POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
