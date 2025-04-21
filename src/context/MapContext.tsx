import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';

interface Location {
  lat: number;
  lng: number;
}

interface MapLayer {
  name: string;
  url: string;
  attribution: string;
}

interface MapContextType {
  location: Location | null;
  setLocation: (location: Location) => void;
  isLocating: boolean;
  locateMe: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  shouldCenterMap: boolean;
  searchLocation: (query: string) => void;
  currentLayer: MapLayer;
  setCurrentLayer: (layer: MapLayer) => void;
  availableLayers: MapLayer[];
  isLayerSelectorVisible: boolean;
  toggleLayerSelector: () => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};

interface MapProviderProps {
  children: ReactNode;
}

const availableLayers: MapLayer[] = [
  {
    name: 'Street',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  {
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  },
  {
    name: 'Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
  }
];

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [shouldCenterMap, setShouldCenterMap] = useState(true);
  const [currentLayer, setCurrentLayer] = useState<MapLayer>(availableLayers[0]);
  const [isLayerSelectorVisible, setIsLayerSelectorVisible] = useState(false);
  
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const toggleLayerSelector = useCallback(() => {
    setIsLayerSelectorVisible(prev => !prev);
  }, []);
  
  const locateMe = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    
    setIsLocating(true);
    setShouldCenterMap(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setIsLocating(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLocating(false);
        alert(`Error getting location: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);
  
  const searchLocation = useCallback((query: string) => {
    setIsLocating(true);
    setShouldCenterMap(true);
    
    setTimeout(() => {
      const mockLocation = location 
        ? { 
            lat: location.lat + (Math.random() * 0.01 - 0.005), 
            lng: location.lng + (Math.random() * 0.01 - 0.005) 
          }
        : { lat: 51.505, lng: -0.09 };
      
      setLocation(mockLocation);
      setIsLocating(false);
      
      console.log(`Search results for: ${query}`);
    }, 1000);
  }, [location]);
  
  const value = {
    location,
    setLocation,
    isLocating,
    locateMe,
    isSidebarOpen,
    toggleSidebar,
    shouldCenterMap,
    searchLocation,
    currentLayer,
    setCurrentLayer,
    availableLayers,
    isLayerSelectorVisible,
    toggleLayerSelector
  };
  
  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};