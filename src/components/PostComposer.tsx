
import React, { useState } from 'react';
import { Image, Smile, Calendar, MapPin } from 'lucide-react';

const PostComposer: React.FC = () => {
  const [post, setPost] = useState('');
  const maxLength = 280;

  return (
    <div className="retro-container p-4 mb-6">
      <div className="flex">
        <div className="h-10 w-10 bg-retro-teal border-2 border-black shadow-retro rounded-sm flex items-center justify-center mr-3">
          <span className="font-retro text-black">U</span>
        </div>
        
        <div className="flex-1">
          <textarea 
            className="retro-input w-full h-24 resize-none"
            placeholder="What's happening?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            maxLength={maxLength}
          />
          
          <div className="flex justify-between mt-3">
            <div className="flex space-x-3">
              <button className="text-retro-blue hover:text-blue-600">
                <Image size={20} className="stroke-[2px]" />
              </button>
              <button className="text-retro-blue hover:text-blue-600">
                <Smile size={20} className="stroke-[2px]" />
              </button>
              <button className="text-retro-blue hover:text-blue-600">
                <Calendar size={20} className="stroke-[2px]" />
              </button>
              <button className="text-retro-blue hover:text-blue-600">
                <MapPin size={20} className="stroke-[2px]" />
              </button>
            </div>
            
            <div className="flex items-center">
              {post.length > 0 && (
                <div className="mr-3 font-retro text-sm">
                  <span className={post.length > maxLength * 0.8 ? 'text-orange-500' : 'text-retro-dark-gray'}>
                    {post.length}/{maxLength}
                  </span>
                </div>
              )}
              <button 
                className={`retro-button ${!post.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!post.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
