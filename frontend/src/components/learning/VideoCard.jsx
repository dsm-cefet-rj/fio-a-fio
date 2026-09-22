import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { StarRating } from '../ui/StarRating';
import { Badge } from '../ui/Badge';
import { Clock, User } from 'lucide-react';

export const VideoCard = ({ lesson }) => {
  return (
    <Card hoverable className="h-full flex flex-col">
      <Link to={`/videoaulas/${lesson.id}`} className="block relative group">
        <img
          src={lesson.thumbnail}
          alt={lesson.title}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="rose" size="md" className="shadow-xs font-bold">
            R$ {lesson.price.toFixed(2).replace('.', ',')}
          </Badge>
        </div>
        {lesson.level && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="gray" size="sm" className="bg-zinc-900/80 text-white backdrop-blur-xs border-none">
              {lesson.level}
            </Badge>
          </div>
        )}
      </Link>

      <CardBody className="flex-1 flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1">
              <StarRating rating={lesson.rating} size={14} />
              <span className="text-xs font-bold text-zinc-800">{lesson.rating}</span>
              <span className="text-xs text-zinc-400">({lesson.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-zinc-500 font-medium">
              <Clock size={12} />
              <span>{lesson.duration}</span>
            </div>
          </div>

          <Link to={`/videoaulas/${lesson.id}`}>
            <h3 className="font-bold text-sm text-zinc-900 line-clamp-2 hover:text-rose-600 transition-colors mb-2">
              {lesson.title}
            </h3>
          </Link>
        </div>

        <div className="pt-3 border-t border-rose-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar src={lesson.creator.avatar} alt={lesson.creator.name} size="xs" />
            <span className="text-xs font-semibold text-zinc-700 truncate max-w-[120px]">
              {lesson.creator.name}
            </span>
          </div>
          <Link
            to={`/videoaulas/${lesson.id}`}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-0.5"
          >
            Ver Detalhes →
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};
