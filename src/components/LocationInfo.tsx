import React from 'react';
import { MapPin, Clock, Navigation, Copy, Check } from 'lucide-react';
import { useMapContext } from '../context/MapContext';

const LocationInfo: React.FC = () => {
  const { location, isLocating } = useMapContext();
  const [copied, setCopied] = React.useState(false);
  
  const copyLocation = async () => {
    if (!location) return;
    
    const text = `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy location:', err);
    }
  };
  
  if (isLocating) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
      </div>
    );
  }
  
  if (!location) {
    return (
      <div className="text-gray-500 text-center py-4">
        <MapPin className="mx-auto mb-2" size={24} />
        <p>No location data available.</p>
        <p className="text-sm">Use the locate button to find your position.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 rounded-lg p-3">
        <div className="flex items-center justify-between text-blue-700 mb-2">
          <div className="flex items-center">
            <MapPin size={16} className="mr-2" />
            <span className="font-medium">Current Location</span>
          </div>
          <button
            onClick={copyLocation}
            className="p-1.5 hover:bg-blue-100 rounded-full transition-colors"
            title="Copy coordinates"
          >
            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
          </button>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Latitude: {location.lat.toFixed(6)}°</p>
          <p>Longitude: {location.lng.toFixed(6)}°</p>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <Clock size={14} className="mr-1" />
            <span>Updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="font-medium mb-2">Actions</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Navigation size={16} className="mr-2" />
            Navigate Here
          </button>
          <button 
            onClick={copyLocation}
            className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Copy size={16} className="mr-2" />
            {copied ? 'Copied!' : 'Copy Location'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;