import React from 'react';
import { useMapContext } from '../context/MapContext';

const LayerSelector: React.FC = () => {
  const { currentLayer, setCurrentLayer, availableLayers, isLayerSelectorVisible } = useMapContext();

  if (!isLayerSelectorVisible) return null;

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 top-20 z-[1000] bg-white rounded-lg shadow-lg p-1">
      <div className="flex space-x-1">
        {availableLayers.map((layer) => (
          <button
            key={layer.name}
            onClick={() => setCurrentLayer(layer)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentLayer.name === layer.name
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {layer.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LayerSelector;