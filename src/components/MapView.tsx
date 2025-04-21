import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapContext } from '../context/MapContext';
import LocationButton from './LocationButton';
import MapControls from './MapControls';
import { icon } from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const MapViewUpdater = () => {
  const { location, shouldCenterMap, currentLayer } = useMapContext();
  const map = useMap();
  
  useEffect(() => {
    if (location && shouldCenterMap) {
      map.flyTo(location, map.getZoom());
    }
  }, [location, shouldCenterMap, map]);
  
  return (
    <TileLayer
      attribution={currentLayer.attribution}
      url={currentLayer.url}
    />
  );
};

const MapView: React.FC = () => {
  const { location, isLocating } = useMapContext();
  
  useEffect(() => {
    delete (window as any).L.Icon.Default.prototype._getIconUrl;
    (window as any).L.Icon.Default.mergeOptions({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIcon2x,
      shadowUrl: markerShadow,
    });
  }, []);
  
  const defaultPosition = { lat: 51.505, lng: -0.09 };
  const position = location || defaultPosition;
  
  const customIcon = icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  return (
    <div className="h-full relative">
      <MapContainer 
        center={position} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <MapViewUpdater />
        
        {location && (
          <Marker position={location} icon={customIcon}>
            <Popup>
              You are here.<br />
              Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
            </Popup>
          </Marker>
        )}
        
        <MapControls />
      </MapContainer>
      
      <div className="absolute bottom-6 right-6 z-[1000]">
        <LocationButton />
      </div>
      
      {isLocating && (
        <div className="absolute top-0 left-0 right-0 flex justify-center z-[1000] mt-4">
          <div className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center animate-pulse">
            <div className="mr-2 w-4 h-4 bg-blue-600 rounded-full"></div>
            <span className="text-sm font-medium">Locating...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;