
import React from 'react';
import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import IPost from "@/lib/types/IPost.ts";


const Post: React.FC<IPost> = ({
  id,
  author_id,
  content,
  views,
  timeCreated,
  usersLiked,
  comments,
  likes = 0,
  shares = 0,
}) => {
  return (
    <div className="retro-container p-4 mb-4">
      <div className="flex items-start">
        <div className="h-10 w-10 bg-retro-purple border-2 border-black shadow-retro rounded-sm flex items-center justify-center mr-3">
          <span className="font-retro text-black">{content.charAt(0).toUpperCase()}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-baseline">
            <h3 className="font-retro text-lg font-bold">{content}</h3>
            <span className="ml-2 font-retro text-retro-dark-gray">@{content}</span>
            <span className="ml-2 font-retro text-xs text-retro-dark-gray">· {content}</span>
          </div>
          
          <p className="my-2 font-retro text-lg">{content}</p>
          
          <div className="flex justify-between mt-4 font-retro">
            <button className="flex items-center text-retro-dark-gray hover:text-blue-500">
              <MessageCircle size={18} className="mr-1" />
              {comments.length > 0 && <span>{comments}</span>}
            </button>
            <button className="flex items-center text-retro-dark-gray hover:text-green-500">
              <Repeat2 size={18} className="mr-1" />
              {shares > 0 && <span>{shares}</span>}
            </button>
            <button className="flex items-center text-retro-dark-gray hover:text-red-500">
              <Heart size={18} className="mr-1" />
              {likes > 0 && <span>{likes}</span>}
            </button>
            <button className="flex items-center text-retro-dark-gray hover:text-blue-500">
              <Share size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
