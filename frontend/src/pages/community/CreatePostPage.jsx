import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatePostModal } from '../../components/community/CreatePostModal';

export const CreatePostPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[60vh]">
      <CreatePostModal
        isOpen={true}
        onClose={() => navigate('/feed')}
        onPostCreated={() => navigate('/feed')}
      />
    </div>
  );
};
