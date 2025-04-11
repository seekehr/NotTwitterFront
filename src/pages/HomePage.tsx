
import React from 'react';
import PostComposer from '../components/PostComposer';
import Post from '../components/Post.tsx';
import IPost from "@/lib/types/IPost.ts";
import {cn} from "@/lib/utils.ts";
import {AlertTriangle, Search} from "lucide-react";
import TrendingTopics from "@/components/TrendingTopics.tsx";
import {DOMAIN} from "../lib/utils.ts";
import {useLocation} from "react-router-dom";

interface PostsProps {
  posts: IPost[];
}

const HomePage: React.FC = () => {
    const posts = async () => {
        const response = await fetch(DOMAIN + "/posts", {
            method: 'POST',
            headers: {
                'Accept': 'text/html',
                'author': 'seeker' // TODO: Introduce a 'trending' author
            },
        });
        if (!response.ok) {
            return <NoPosts />;
        }
    };
    return <NoPosts />
};

const NoPosts: React.FC = () => {
    return (
        <div
            className={cn(
                "flex items-center gap-3 p-4 rounded-md bg-retro-background bg-opacity-80 w-full max-w-md mx-auto relative overflow-hidden",
                "nopostsfound"
            )}
        >
            {/* Top and bottom borders with glow effect */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-retro-red shadow-[0_0_5px_rgba(255,0,0,0.7)]"></div>
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-retro-red shadow-[0_0_5px_rgba(255,0,0,0.7)]"></div>

            {/* Left and right borders with glow effect */}
            <div className="absolute inset-y-0 left-0 w-[2px] bg-retro-red shadow-[0_0_5px_rgba(255,0,0,0.7)]"></div>
            <div className="absolute inset-y-0 right-0 w-[2px] bg-retro-red shadow-[0_0_5px_rgba(255,0,0,0.7)]"></div>

            <div className="flex-shrink-0 z-10">
                <AlertTriangle className="h-6 w-6 text-retro-red" strokeWidth={2.5} />
            </div>
            <p className="font-mono text-retro-red text-lg font-bold retro-text-shadow tracking-wide z-10 animate-pulse-retro">
          No posts found!
            </p>
        </div>
    );
};

const Posts: React.FC<PostsProps> = ({ posts }) => {
    return (
        <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-y-auto">
                <div className="sticky top-0 bg-blue-50 border-b-2 border-black p-4 z-10">
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
export default HomePage;
