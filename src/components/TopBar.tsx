import React, { useState } from 'react';
import { Menu, Search, X, Layers, Maximize, Share2 } from 'lucide-react';
import { useMapContext } from '../context/MapContext';

const TopBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { toggleSidebar, searchLocation, toggleLayerSelector } = useMapContext();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchLocation(searchQuery);
    }
  };

  return (
    <div className="bg-white shadow-md z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          
          <div className="text-xl font-semibold text-blue-600 flex items-center">
            <span className="hidden md:inline">MapTracker</span>
          </div>
        </div>
        
        <form 
          onSubmit={handleSearch}
          className={`relative flex-1 mx-4 max-w-2xl transition-all duration-200 ${
            isSearchFocused ? 'scale-105' : ''
          }`}
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search for a location..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search size={18} />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </form>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleLayerSelector}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors" 
            aria-label="Change map layers"
          >
            <Layers size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Fullscreen">
            <Maximize size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Share location">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;