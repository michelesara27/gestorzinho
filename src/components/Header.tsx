import React from 'react';
import { Menu, User } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  isMobile: boolean;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMobile, currentPage }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        {isMobile && (
          <button
            onClick={onMenuToggle}
            className="p-2 -ml-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Gestorzinho</h1>
            <p className="text-sm text-gray-500 hidden sm:block">{currentPage}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
