
import React, {useEffect, useState} from 'react';
import Post from '../components/Post.tsx';
import TrendingTopics from '../components/TrendingTopics';
import {AlertTriangle, Search} from 'lucide-react';
import {cn} from "@/lib/utils.ts";
import IPost from "@/lib/types/IPost.ts";
import ErrorProp from "@/lib/types/ErrorProp.ts";
import {DOMAIN} from "../lib/utils.ts";

interface PostsProps {
  posts: IPost[];
}

const ExplorePage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch(DOMAIN + "/posts", {
                method: 'POST',
                headers: {
                    'Accept': 'text/html',
                    'author': 'seeker' // TODO: Introduce a 'trending' author
                },
            });
            const data = await response.json()
            if (!response.ok) {
                if (typeof(data) === 'object' && 'error' in data) {
                    setError(data.error);
                }
            } else {
                setPosts(Object.values(data));
            }
        }

        fetchPosts();
    }, []);

    if (error) return <NoPosts msg={error}/>;
    return <Posts posts={posts}/>;
};

const NoPosts: React.FC<ErrorProp> = ({ msg }) => {
  return (
      <div
          className={cn(
              "flex items-center gap-3 p-4 rounded bg-retro-background bg-opacity-80 retro-border retro-box-shadow w-full max-w-md mx-auto animate-pulse-retro",
              "nopostsfound"
          )}
      >
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-retro-red" strokeWidth={2.5} />
        </div>
        <p className="font-mono text-retro-red text-lg font-bold retro-text-shadow tracking-wide">
          No posts found!
        </p>
      </div>
  );
};

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="sticky top-0 bg-retro-light-gray border-b-2 border-black p-4 z-10">
            <h1 className="font-pixel text-lg">Explore</h1>
          </div>

          <div className="p-4">
            <div className="mb-6">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-retro-dark-gray" />
                <input
                    type="text"
                    className="retro-input pl-10 w-full"
                    placeholder="Search for topics, users, or posts"
                />
              </div>
            </div>

            {posts.map((post, index) => (
                <Post key={index} {...post} />
            ))}
          </div>
        </div>

        <div className="w-80 border-l-2 border-black overflow-y-auto">
          <div className="p-4">
            <TrendingTopics />
          </div>
        </div>
      </div>
  );
}

export default ExplorePage;
