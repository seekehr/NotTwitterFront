
import React from 'react';
import Sidebar from '../components/Sidebar';
import Home from './Home';
import Explore from './Explore';
import TrendingTopics from '../components/TrendingTopics';
import { useLocation } from 'react-router-dom';

const Index: React.FC = () => {
  const location = useLocation();
  
  const renderMainContent = () => {
    const path = location.pathname;
    if (path === '/explore') {
      return <Explore />;
    }
    return <Home />;
  };

  return (
    <div className="min-h-screen bg-retro-light-gray flex">
      <Sidebar />
      
      <main className="flex-1 flex border-l-2 border-black">
        {renderMainContent()}
        
        <div className="hidden lg:block w-80 p-4 border-l-2 border-black">
          <TrendingTopics />
        </div>
      </main>
    </div>
  );
};

export default Index;
