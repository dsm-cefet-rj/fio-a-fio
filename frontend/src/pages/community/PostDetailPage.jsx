import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_POSTS } from '../../mocks/posts';
import { PostCommentsModal } from '../../components/community/PostCommentsModal';

export const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = MOCK_POSTS.find((p) => p.id === id) || MOCK_POSTS[0];

  return (
    <div className="relative min-h-[60vh]">
      <PostCommentsModal
        isOpen={true}
        onClose={() => navigate('/feed')}
        post={post}
      />
    </div>
  );
};
