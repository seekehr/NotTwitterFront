
import React from 'react';

const RetroLogo: React.FC = () => {
  return (
    <div className="h-8 w-8 relative flex items-center justify-center">
      <div className="absolute inset-0 border-2 border-black bg-retro-teal rounded-sm shadow-retro flex items-center justify-center">
        <span className="font-pixel text-xs text-black">R</span>
      </div>
    </div>
  );
};

export default RetroLogo;
