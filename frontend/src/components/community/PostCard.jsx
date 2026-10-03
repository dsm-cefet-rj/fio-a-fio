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
      <Card className="mb-6 border-[#EADED5] hover:border-[#EF9FB1] transition-all duration-300 shadow-craft bg-white">
        <CardHeader className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <Avatar src={post.author.avatar} alt={post.author.name} size="md" className="border-2 border-[#EF9FB1]" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-[#17151A]">{post.author.name}</span>
                {post.author.verified && (
                  <span className="text-[10px] bg-[#FEF1F4] text-[#E55B86] px-2 py-0.5 rounded-full font-extrabold border border-[#EF9FB1]">
                    Professora 🧶
                  </span>
                )}
              </div>
              <p className="text-[11px] font-medium text-[#896B70]">{post.timeAgo} • @{post.author.username}</p>
            </div>
          </div>
          {post.category && (
            <span className="text-[11px] font-extrabold px-3 py-1 bg-[#FEF1F4] text-[#E55B86] rounded-full border border-[#EF9FB1] shadow-2xs">
              {post.category}
            </span>
          )}
        </CardHeader>

        <CardBody className="py-3.5 space-y-2.5">
          <h3 className="font-extrabold text-base text-[#17151A] leading-snug">{post.title}</h3>
          <p className="text-sm text-[#17151A]/85 leading-relaxed">{post.content}</p>
          {post.image && (
            <div
              className="rounded-2xl overflow-hidden border border-[#EADED5] my-3 cursor-pointer group shadow-2xs"
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

        <CardFooter className="flex items-center justify-between pt-2 border-t border-[#EADED5]">
          <div className="flex items-center gap-2">
            <Button
              variant={isLiked ? 'secondary' : 'ghost'}
              size="sm"
              onClick={toggleLike}
              className={isLiked ? 'text-[#E55B86] bg-[#FEF1F4] border-[#EF9FB1] font-extrabold shadow-2xs' : 'text-[#896B70] hover:text-[#E55B86] hover:bg-[#FEF1F4]/50'}
            >
              <Heart size={16} className={isLiked ? 'fill-[#E55B86] text-[#E55B86]' : ''} />
              <span>{likesCount} Curtidas</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCommentsOpen(true)}
              className="text-[#896B70] hover:text-[#E55B86] hover:bg-[#FEF1F4]/50"
            >
              <MessageCircle size={16} />
              <span>{comments.length} Comentários</span>
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => alert('Link copiado para compartilhamento!')}
              className="text-[#896B70] hover:text-[#E55B86] hover:bg-[#FEF1F4]/50"
              aria-label="Compartilhar publicação"
            >
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
