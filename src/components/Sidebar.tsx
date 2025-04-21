import React from 'react';
import { MapPin, Navigation, Compass, Map, History, Settings, Info } from 'lucide-react';
import { useMapContext } from '../context/MapContext';
import LocationInfo from './LocationInfo';

const Sidebar: React.FC = () => {
  const { isSidebarOpen, location } = useMapContext();
  
  return (
    <div 
      className={`bg-white shadow-lg z-10 flex flex-col transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-72' : 'w-0 md:w-16'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          {isSidebarOpen && (
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Location Details</h2>
              <LocationInfo />
            </div>
          )}
          
          {/* Icons only when sidebar is collapsed */}
          {!isSidebarOpen && (
            <div className="flex flex-col items-center pt-4 space-y-6">
              <button className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                <MapPin size={20} />
              </button>
              <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                <Navigation size={20} />
              </button>
              <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                <Compass size={20} />
              </button>
              <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                <Map size={20} />
              </button>
              <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                <History size={20} />
              </button>
            </div>
          )}
        </div>
        
        {/* Footer icons */}
        <div className={`p-4 border-t ${isSidebarOpen ? '' : 'flex flex-col items-center space-y-4'}`}>
          {isSidebarOpen ? (
            <div className="flex items-center justify-around">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Settings size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Info size={20} />
              </button>
            </div>
          ) : (
            <>
              <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                <Settings size={20} />
              </button>
              <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                <Info size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;