import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import RetroLogo from './RetroLogo';
import { Home, Search, Bell, Mail, Bookmark, User, Settings, PenSquare, MessageCircle } from 'lucide-react';
import NavItem from "@/components/ui/navitem.tsx";

export const Sidebar: React.FC = () => {
    const location = useLocation();
    const [activeButton, setActiveButton] = useState<string|null>(null);

    useEffect(() => {
        switch (location.pathname) {
        case "/":
            setActiveButton('home');
            break;
        case "/explore":
            setActiveButton('explore');
            break;
        case "/notifications":
            setActiveButton('notifications');
            break;
        case "/messages":
            setActiveButton('messages');
            break;
        case "/bookmarks":
            setActiveButton('bookmarks');
            break;
        case "/settings":
            setActiveButton('settings');
            break;
        default:
            setActiveButton(null);
            break;
        }
    }, [location, setActiveButton]);

    return (
        <div className="flex-grow space-y-6">
            <NavItem icon={<Home size={18} />} link={"/"} text="Home" active={activeButton === "home"} />
            <NavItem icon={<Search size={18} />} link={"/explore"} text="Explore" active={activeButton === "explore"} />
            <NavItem icon={<Bell size={18} />} link={"/notifications"} text="Notifications" active={activeButton === "notifications"} />
            <NavItem icon={<MessageCircle size={18} />} link={"/messages"} text="Messages" active={activeButton === "messages"} />
            <NavItem icon={<Bookmark size={18} />} link={"/bookmarks"} text="Bookmarks" active={activeButton === "bookmarks"} />
            <NavItem icon={<Settings size={18} />} link={"/settings"} text="Settings" active={activeButton === "settings"}/>
        </div>
    );
}

export const HomeSidebar: React.FC = () => {
    return (
        <div className="w-64 h-screen border-r border-blue-200 bg-blue-50 p-4">
            <div className="flex flex-col h-full">
                <div className="mb-6 pl-4">
                    <RetroLogo />
                </div>

                <Sidebar />

                <button className="retro-button w-full py-2 mt-4 font-bold">
                    Create NotTweet
                </button>
            </div>
        </div>
    );
};
