
import React from 'react';
import { Search } from 'lucide-react';

interface TrendProps {
  category: string;
  title: string;
  posts?: string;
}

const TrendingTopics: React.FC = () => {
  const trends: TrendProps[] = [
    { category: 'Technology', title: 'RetroComputing', posts: '12.5K posts' },
    { category: 'Gaming', title: '8BitGames', posts: '5.2K posts' },
    { category: 'Design', title: 'PixelArt', posts: '3.4K posts' },
    { category: 'Trending', title: 'VintageWeb', posts: '2.1K posts' },
    { category: 'Music', title: 'Synthwave', posts: '1.8K posts' },
  ];

  return (
    <div className="retro-container">
      <div className="p-4 border-b-2 border-black">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-retro-dark-gray" />
          <input 
            type="text" 
            className="retro-input pl-10 w-full" 
            placeholder="Search" 
          />
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="font-retro text-xl font-bold mb-4">What's Trending</h2>
        
        <div className="space-y-4">
          {trends.map((trend, index) => (
            <div key={index} className="cursor-pointer hover:bg-retro-gray p-2 rounded">
              <p className="font-retro text-xs text-retro-dark-gray">{trend.category}</p>
              <p className="font-retro font-bold">#{trend.title}</p>
              <p className="font-retro text-xs text-retro-dark-gray">{trend.posts}</p>
            </div>
          ))}
        </div>
        
        <a href="#" className="block mt-4 font-retro text-retro-blue">
          Show more
        </a>
      </div>
    </div>
  );
};

export default TrendingTopics;
