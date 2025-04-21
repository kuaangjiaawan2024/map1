import React from 'react';
import { useMap } from 'react-leaflet';
import { Plus, Minus, Maximize, RotateCcw, Ruler } from 'lucide-react';

const MapControls: React.FC = () => {
  const map = useMap();
  
  const handleZoomIn = () => {
    map.zoomIn();
  };
  
  const handleZoomOut = () => {
    map.zoomOut();
  };
  
  const handleReset = () => {
    map.setView(map.getCenter(), 13);
  };
  
  // Placeholder functions for other controls
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  
  const handleMeasure = () => {
    // Measurement tool functionality would be implemented here
    console.log('Measure tool clicked');
  };
  
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-2">
      <div className="bg-white rounded-md shadow-md">
        <button 
          onClick={handleZoomIn}
          className="p-2 hover:bg-gray-100 rounded-t-md w-10 h-10 flex items-center justify-center border-b border-gray-200"
          aria-label="Zoom in"
        >
          <Plus size={18} />
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-2 hover:bg-gray-100 rounded-b-md w-10 h-10 flex items-center justify-center"
          aria-label="Zoom out"
        >
          <Minus size={18} />
        </button>
      </div>
      
      <div className="bg-white rounded-md shadow-md space-y-1 p-1">
        <button 
          onClick={handleFullscreen}
          className="p-2 hover:bg-gray-100 rounded-md w-10 h-10 flex items-center justify-center"
          aria-label="Fullscreen"
        >
          <Maximize size={18} />
        </button>
        <button 
          onClick={handleReset}
          className="p-2 hover:bg-gray-100 rounded-md w-10 h-10 flex items-center justify-center"
          aria-label="Reset view"
        >
          <RotateCcw size={18} />
        </button>
        <button 
          onClick={handleMeasure}
          className="p-2 hover:bg-gray-100 rounded-md w-10 h-10 flex items-center justify-center"
          aria-label="Measure distance"
        >
          <Ruler size={18} />
        </button>
      </div>
    </div>
  );
};

export default MapControls;