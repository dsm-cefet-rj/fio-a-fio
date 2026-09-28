import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { PostCommentsModal } from './PostCommentsModal';

export const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState(post.comments || []);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleCommentAdded = (postId, updatedComments) => {
    setComments(updatedComments);
  };

  const currentPostWithComments = {
    ...post,
    comments: comments,
    commentsCount: comments.length,
    isLiked,
    likesCount
  };

  return (
    <>
      <Card className="mb-6 hover:border-rose-200 transition-colors">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={post.author.avatar} alt={post.author.name} size="md" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-zinc-900">{post.author.name}</span>
                {post.author.verified && (
                  <span className="text-xs bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-semibold">
                    Professora
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500">{post.timeAgo} • @{post.author.username}</p>
            </div>
          </div>
          {post.category && (
            <span className="text-xs font-semibold px-2.5 py-1 bg-rose-50 text-rose-700 rounded-full border border-rose-100">
              {post.category}
            </span>
          )}
        </CardHeader>

        <CardBody className="py-3">
          <h3 className="font-bold text-base text-zinc-900 mb-1">{post.title}</h3>
          <p className="text-sm text-zinc-700 leading-relaxed mb-3">{post.content}</p>
          {post.image && (
            <div
              className="rounded-xl overflow-hidden border border-rose-100 my-2 cursor-pointer group"
              onClick={() => setIsCommentsOpen(true)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full max-h-96 object-cover group-hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
          )}
        </CardBody>

        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={isLiked ? 'secondary' : 'ghost'}
              size="sm"
              onClick={toggleLike}
              className={isLiked ? 'text-rose-600 bg-rose-100 border-rose-300 font-bold' : ''}
            >
              <Heart size={16} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />
              <span>{likesCount} Curtidas</span>
            </Button>

            <Button variant="ghost" size="sm" onClick={() => setIsCommentsOpen(true)}>
              <MessageCircle size={16} />
              <span>{comments.length} Comentários</span>
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => alert('Link copiado para compartilhamento!')}>
              <Share2 size={16} />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <PostCommentsModal
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        post={currentPostWithComments}
        onCommentAdded={handleCommentAdded}
      />
    </>
  );
};
