import React from 'react';
import Landing from './start/Landing';
import Itinerary from './Itinerary/Itinerary';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import MapView from './map/MapView.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MapView />
      </header>
    </div>
  );
}

export default App;
