import React, { useState } from 'react';
import { Avatar } from '../ui/Avatar';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStories } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { useRole } from '../../context/RoleContext';
import { StoryViewerModal } from './StoryViewerModal';

export const StoryBar = () => {
  const { currentUser, currentRole } = useRole();
  const [activeStory, setActiveStory] = useState(null);
  const { data: stories = [] } = useApiData('stories', getStories);

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#E8CCD4] shadow-craft mb-6 overflow-x-auto no-scrollbar max-w-full">
      <div className="flex items-center gap-4 min-w-max">
        {/* Adicionar Story com dados do usuário logado */}
        <Link
          to={currentRole === 'guest' ? '/login' : '/stories/criar'}
          className="flex flex-col items-center gap-1.5 group cursor-pointer"
        >
          <div className="relative">
            <Avatar
              src={currentUser?.avatar}
              alt={currentUser?.name || 'Seu Story'}
              size="lg"
            />
            <div className="absolute bottom-0 right-0 bg-[#B94F70] text-white p-1 rounded-full border-2 border-white shadow-xs group-hover:scale-110 transition-transform">
              <Plus size={12} strokeWidth={3} />
            </div>
          </div>
          <span className="text-xs font-bold text-[#251D20] group-hover:text-[#B94F70] transition-colors">Seu Story</span>
        </Link>

        {/* Stories da comunidade */}
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none"
          >
            <Avatar
              src={story.avatar}
              alt={story.authorName}
              size="lg"
              hasStory={story.hasStory}
              isUnseen={story.hasUnseen}
              className="group-hover:scale-105 transition-transform"
            />
            <span className="text-xs font-bold text-[#251D20] group-hover:text-[#B94F70] max-w-[72px] truncate transition-colors">
              {story.authorName}
            </span>
          </button>
        ))}
      </div>

      {activeStory && (
        <StoryViewerModal story={activeStory} onClose={() => setActiveStory(null)} />
      )}
    </div>
  );
};
