import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
class MapView extends Component {
   render() {
   const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 43.652070, lng: -79.385015 } }
        defaultZoom = { 13 }
      >

<DirectionsRenderer origin={{ lat: 43.651070, lng: -79.347015 }} destination={{ lat: 43.652070, lng: -79.385015 }} />
      </GoogleMap>
   ));
   return(
      <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: `100vh`, width: '100vw' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
   );
   }
};
export default MapView;