
import React, {useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import HomePage from './HomePage.tsx';
import ExplorePage from './ExplorePage.tsx';
import TrendingTopics from '../components/TrendingTopics';
import { useLocation } from 'react-router-dom';
import LoginFooter from "@/components/login/LoginFooter.tsx";

const Index: React.FC = () => {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(false);

  const renderMainContent = () => {
    const path = location.pathname;
    if (path === '/explore') {
      return <ExplorePage />;
    }
    return <HomePage />;
  };

  useEffect(() => {
    console.log(document.cookie)
  }, []);
  return (
      <>
        <div className="min-h-screen bg-retro-light-gray flex">
          <Sidebar/>

          <main className="flex-1 flex border-l-2 border-black">
            {renderMainContent()}

            <div className="hidden lg:block w-80 p-4 border-l-2 border-black">
              <TrendingTopics/>
            </div>
          </main>
        </div>
        <LoginFooter/>
      </>
  );
};

export default Index;
