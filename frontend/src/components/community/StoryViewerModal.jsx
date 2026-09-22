import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

export const StoryViewerModal = ({ story, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          onClose();
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onClose]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-md p-4 animate-fadeIn">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-rose-400 p-2 rounded-full bg-white/10 backdrop-blur-xs transition-colors"
      >
        <X size={24} />
      </button>

      <div className="relative w-full max-w-sm h-[600px] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-zinc-800">
        {/* Progress Bar */}
        <div className="absolute top-3 left-3 right-3 z-10 flex gap-1">
          <div className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden">
            <div
              className="h-full bg-rose-500 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Story Header */}
        <div className="absolute top-6 left-4 right-4 z-10 flex items-center gap-3">
          <Avatar src={story.avatar} alt={story.authorName} size="sm" />
          <div className="text-white drop-shadow-md">
            <p className="text-xs font-bold">{story.authorName}</p>
            <p className="text-[10px] text-zinc-300">{story.createdAt}</p>
          </div>
        </div>

        {/* Story Media */}
        <img
          src={story.mediaUrl}
          alt={story.caption || 'Story'}
          className="w-full h-full object-cover"
        />

        {/* Caption */}
        {story.caption && (
          <div className="absolute bottom-6 left-4 right-4 z-10 bg-zinc-900/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-white text-xs text-center font-medium">
            {story.caption}
          </div>
        )}
      </div>
    </div>
  );
};
