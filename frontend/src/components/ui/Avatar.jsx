import React from 'react';

export const Avatar = ({ src, alt = 'Avatar', size = 'md', hasStory = false, isUnseen = false, className = '' }) => {
  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const getInitials = (name) => {
    if (!name) return 'FA';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const ringStyles = hasStory
    ? isUnseen
      ? 'p-0.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 rounded-full'
      : 'p-0.5 bg-zinc-300 rounded-full'
    : '';

  const hasCustomDimension = className.includes('w-') || className.includes('h-');
  const sizeClasses = hasCustomDimension ? '' : (sizes[size] || sizes.md);

  return (
    <div className={`inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden ${ringStyles} ${sizeClasses} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover aspect-square"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-rose-200 text-rose-800 font-bold flex items-center justify-center aspect-square">
          {getInitials(alt)}
        </div>
      )}
    </div>
  );
};
