import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Landing from './start/Landing';
import Itinerary from './Itinerary/Itinerary';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import MapView from './map/MapView.js';
import MapViewWalking from './map/MapViewWalking';

function App() {
  const [timetable, setTimeTable] = useState([]);
  const [itinerary, setItinerary] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/map">
              <MapView itinerary={itinerary} timetable={timetable}/>
            </Route>
            <Route path="/mapWalking">
              <MapViewWalking itinerary={itinerary} timetable={timetable}/>
            </Route>
            <Route path="/mapBicycling">
              <MapViewWalking itinerary={itinerary} timetable={timetable}/>
            </Route>
            <Route path="/itinerary">
              <Itinerary timeTableFetch={(table, itinerary) => {console.log(table); setTimeTable(table); setItinerary(itinerary)}} />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
