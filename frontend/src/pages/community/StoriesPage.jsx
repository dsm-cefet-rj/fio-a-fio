import React from 'react';
import { getStories } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { StoryViewerModal } from '../../components/community/StoryViewerModal';
import { useNavigate } from 'react-router-dom';

export const StoriesPage = () => {
  const navigate = useNavigate();
  const { data: stories = [] } = useApiData('stories', getStories);
  const firstStory = stories[0];

  return (
    <StoryViewerModal
      story={firstStory}
      onClose={() => navigate('/feed')}
    />
  );
};
