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

function App() {
  const [timetable, setTimeTable] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/map">
              <MapView />
            </Route>
            <Route path="/itinerary">
              <Itinerary timeTableFetch={table => {setTimeTable(table)}} />
            </Route>
            <Route path="/">
              <Landing timetable={timetable}/>
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
