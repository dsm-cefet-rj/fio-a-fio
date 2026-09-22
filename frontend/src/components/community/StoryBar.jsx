import React, { useState } from 'react';
import { Avatar } from '../ui/Avatar';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_STORIES } from '../../mocks/stories';
import { StoryViewerModal } from './StoryViewerModal';

export const StoryBar = () => {
  const [activeStory, setActiveStory] = useState(null);

  return (
    <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-sm mb-6 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-4 min-w-max">
        {/* Adicionar Story */}
        <Link to="/stories/criar" className="flex flex-col items-center gap-1.5 group cursor-pointer">
          <div className="relative">
            <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" size="lg" />
            <div className="absolute bottom-0 right-0 bg-rose-500 text-white p-1 rounded-full border-2 border-white shadow-xs group-hover:scale-110 transition-transform">
              <Plus size={12} strokeWidth={3} />
            </div>
          </div>
          <span className="text-xs font-semibold text-zinc-700 group-hover:text-rose-600">Seu Story</span>
        </Link>

        {/* Stories Mocado */}
        {MOCK_STORIES.filter(s => !s.isOwn).map((story) => (
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
            <span className="text-xs font-semibold text-zinc-700 group-hover:text-rose-600 max-w-[70px] truncate">
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
