import React from 'react';
import { Compass } from 'lucide-react';
import { useMapContext } from '../context/MapContext';

const LocationButton: React.FC = () => {
  const { locateMe, isLocating } = useMapContext();
  
  return (
    <button
      onClick={locateMe}
      disabled={isLocating}
      className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
        isLocating
          ? 'bg-gray-200 text-gray-500'
          : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
      }`}
      aria-label="Find my location"
    >
      <Compass size={24} className={isLocating ? 'animate-spin' : ''} />
    </button>
  );
};

export default LocationButton;