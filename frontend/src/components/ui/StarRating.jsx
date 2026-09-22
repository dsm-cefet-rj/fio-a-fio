import React, { useState } from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating = 0, maxStars = 5, interactive = false, onChange, size = 18 }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = interactive
          ? starValue <= (hoverRating || rating)
          : starValue <= rating;

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange && onChange(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
          >
            <Star
              size={size}
              className={`${
                isFilled ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'
              } transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
};
