import React from 'react';
import { MOCK_STORIES } from '../../mocks/stories';
import { StoryViewerModal } from '../../components/community/StoryViewerModal';
import { useNavigate } from 'react-router-dom';

export const StoriesPage = () => {
  const navigate = useNavigate();
  const firstStory = MOCK_STORIES.find((s) => !s.isOwn) || MOCK_STORIES[1];

  return (
    <StoryViewerModal
      story={firstStory}
      onClose={() => navigate('/feed')}
    />
  );
};
