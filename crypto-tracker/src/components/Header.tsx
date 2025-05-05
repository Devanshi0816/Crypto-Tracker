import React from 'react';
import { Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 py-4 shadow-md">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={28} className="text-blue-500" />
            <h1 className="text-2xl font-bold text-white">CryptoTrack</h1>
          </div>
          <div className="text-sm text-gray-400">
            <span className="animate-pulse inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Live Updates
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;