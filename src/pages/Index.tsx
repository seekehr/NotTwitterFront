
import React, {useEffect, useState} from 'react';
import {HomeSidebar} from '../components/Sidebar';
import HomePage from './HomePage.tsx';
import ExplorePage, {NoPosts} from './ExplorePage.tsx';
import TrendingTopics from '../components/TrendingTopics';
import { useLocation } from 'react-router-dom';
import LoginFooter from "@/components/login/LoginFooter.tsx";
import {DOMAIN, getCookie} from "@/lib/utils.ts";

const Index: React.FC = () => {
    initCookies();

    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [posts, setPosts] = useState<object|undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

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
                    setError("Error: " + data.error);
                }
            } else {
                setPosts(Object.values(data));
                return;
            }

            setPosts(undefined);
        }

        fetchPosts();
    }, [setError, setPosts, setIsLoggedIn]);

    useEffect(() => {
        if (getCookie("token")) {
            setIsLoggedIn(true);
        }
    }, [setIsLoggedIn]);

    const renderMainContent = () => {
        const path = location.pathname;
        if (path === '/explore') {
            if (posts === undefined) {
                return <NoPosts msg={error}/>
            }
        }
        return <HomePage />;
    };

    return (
        <>
            <div className="min-h-screen bg-blue-50 flex">
                <HomeSidebar />

                <main className="flex-1 flex border-l-2 border-black">
                    {renderMainContent()}

                    <div className="hidden lg:block w-80 p-4 border-l-2 border-black">
                        <TrendingTopics/>
                    </div>
                </main>
            </div>
            {!isLoggedIn && <LoginFooter/>}
        </>
    );
};

function initCookies(): void {
    if (!getCookie("theme")) {
        document.cookie = `theme=light; path=/; max-age=15552000`;
    }
    if (!getCookie("notifications")) {
        document.cookie = `notifications=true; path=/; max-age=15552000`;
    }
}

export default Index;
