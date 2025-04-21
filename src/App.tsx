import React from 'react';
import MapView from './components/MapView';
import Layout from './components/Layout';
import LayerSelector from './components/LayerSelector';
import { MapProvider } from './context/MapContext';

function App() {
  return (
    <MapProvider>
      <Layout>
        <MapView />
        <LayerSelector />
      </Layout>
    </MapProvider>
  );
}

export default App;