import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPosts } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { PostCommentsModal } from '../../components/community/PostCommentsModal';

export const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: posts = [] } = useApiData('posts', getPosts);
  const post = posts.find((item) => item.id === id) || posts[0];

  return (
    <div className="relative min-h-[60vh]">
      <PostCommentsModal
        isOpen={Boolean(post)}
        onClose={() => navigate('/feed')}
        post={post}
      />
    </div>
  );
};
