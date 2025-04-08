
import React from 'react';
import { Link } from 'react-router-dom';
import RetroLogo from './RetroLogo';
import { Home, Search, Bell, Mail, Bookmark, User, Settings, PenSquare } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen border-r-2 border-black bg-white p-4">
      <div className="flex flex-col h-full">
        <div className="mb-6 pl-4">
          <RetroLogo />
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-1">
            <li>
              <Link to="/" className="retro-nav-button">
                <Home size={20} className="stroke-[2px]" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/explore" className="retro-nav-button">
                <Search size={20} className="stroke-[2px]" />
                <span>Explore</span>
              </Link>
            </li>
            <li>
              <Link to="/notifications" className="retro-nav-button">
                <Bell size={20} className="stroke-[2px]" />
                <span>Notifications</span>
              </Link>
            </li>
            <li>
              <Link to="/messages" className="retro-nav-button">
                <Mail size={20} className="stroke-[2px]" />
                <span>Messages</span>
              </Link>
            </li>
            <li>
              <Link to="/bookmarks" className="retro-nav-button">
                <Bookmark size={20} className="stroke-[2px]" />
                <span>Bookmarks</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className="retro-nav-button">
                <User size={20} className="stroke-[2px]" />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="retro-nav-button">
                <Settings size={20} className="stroke-[2px]" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <button className="retro-button w-full py-2 mt-4 font-bold">
          Create NotTweet
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
