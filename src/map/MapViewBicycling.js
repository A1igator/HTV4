import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import './MapView.css';
import useGeolocation from 'react-hook-geolocation';
import {withRouter} from 'react-router-dom';
const { compose, withProps, lifecycle, withStateHandlers } = require("recompose");
const {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} = require("react-google-maps");
let my_mode = window.google.maps.TravelMode.BICYCLING;
  var test = [
    //['EjAxMDk1IE1pbGl0YXJ5IFRyYWlsLCBTY2FyYm9yb3VnaCwgT04gTTFDLCBDYW5hZGEiMRIvChQKEgkZZMv3cdrUiRGHVO7W2wI10hDHCCoUChIJD0-c13Da1IkRGWlnDJ0lOVg','Loading...','Loading...'],
    //['EjAxMDk1IE1pbGl0YXJ5IFRyYWlsLCBTY2FyYm9yb3VnaCwgT04gTTFDLCBDYW5hZGEiMRIvChQKEgkZZMv3cdrUiRGHVO7W2wI10hDHCCoUChIJD0-c13Da1IkRGWlnDJ0lOVg','Loading...','Loading...']
  //  ['ChIJFRRC17Q2K4gRrDLxhzRnQJ4','35','Zoo'],
  //   ['ChIJ44AtJc00K4gRnPYkPlAQ648','70','Store'],
  //    ['ChIJxc6GqN3M1IkR5KeSVS1QcOY','25','School'],
  //     ['ChIJo6RbIvLZ1IkRfVHfYVKwK1M','5','Aquarium']
    ]; 


class MapView extends Component {
   render() {
    console.log("HEY",my_mode,this.props.timetable);
    if(this.props.timetable.response){
      test = this.props.timetable.response;
      console.log("test",test);
    }
    const MapWithADirectionsRenderer = compose(
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          console.log('test');
          let DirectionsService = new window.google.maps.DirectionsService();
          var wypnts = [];
          wypnts.push({
              location: {'placeId': 'EjAxMDk1IE1pbGl0YXJ5IFRyYWlsLCBTY2FyYm9yb3VnaCwgT04gTTFDLCBDYW5hZGEiMRIvChQKEgkZZMv3cdrUiRGHVO7W2wI10hDHCCoUChIJD0-c13Da1IkRGWlnDJ0lOVg'}
            });
          for (var i = 0; i < test.length; i++)
          {
            wypnts.push({
              location: {'placeId': test[i][0]}
            });
          }
          wypnts.push({
            location: {'placeId': 'EjAxMDk1IE1pbGl0YXJ5IFRyYWlsLCBTY2FyYm9yb3VnaCwgT04gTTFDLCBDYW5hZGEiMRIvChQKEgkZZMv3cdrUiRGHVO7W2wI10hDHCCoUChIJD0-c13Da1IkRGWlnDJ0lOVg'}
          });
          console.log("RECALCULATING WYPNTS",wypnts);
          var my_origin = wypnts.shift();
          var my_destination = wypnts.pop();
          // console.log(my_origin);
          // console.log(my_origin.location.placeId);
          DirectionsService.route({
            origin: {
              'placeId': my_origin.location.placeId
            },
            destination: {
              'placeId': my_destination.location.placeId
            },
            waypoints: wypnts,
            optimizeWaypoints: true,
            travelMode: my_mode
          }, (result, status) => {
            console.log("ASHLINGS",result);
            if (status === window.google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
              });
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      })
    )(props =>
      <GoogleMap
        defaultZoom={7}
        defaultCenter={new window.google.maps.LatLng(41.8507300, -87.6512600)}
      >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
      </GoogleMap>
    );
    
    const modes = [
      {
        key: 'DRIVING',
        text: 'Driving',
        value: '/map',
        //image: { avatar: true, src: 'https://imgur.com/QknR12N' },
      },
      {
        key: 'WALKING',
        text: 'Walking',
        value: '/mapWalking',
        //image: { src: '/transport_icons/a.jpg' },
      },
      {
        key: 'BICYCLING',
        text: 'Bicycling',
        value: '/mapBicycling',
        //image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
      },
      // {
      //   key: 'TRANSIT',
      //   text: 'Transit',
      //   value: '/mapTransit',
      //  // image: { avatar: true, src: '/images/avatar/small/christian.jpg' },
      // }
    ];
    var ctgries = [];
    for (let i = 0; i < test.length; i++)
    {
      ctgries.push(test[i][2]);
    }
    var arv_times = [];
    for (let i = 0; i < test.length; i++)
    {
      arv_times.push(test[i][1]);
    }
    var my_mark = 'B';
    if(test.length == 1){my_mark = 'C'}
    if(test.length == 2){my_mark = 'D'}
    if(test.length == 3){my_mark = 'E'}
    if(test.length == 4){my_mark = 'F'}
    if(test.length == 5){my_mark = 'G'}
    if(test.length == 6){my_mark = 'H'}
   return(
      <div>
        <MapWithADirectionsRenderer
          containerElement={ <div style={{ height: `100vh`, width: '100vw' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
        <div className="info-table">
        <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Mark</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row >
        <Table.Cell>{my_mark}</Table.Cell>
        <Table.Cell>Start</Table.Cell>
      </Table.Row>
      {test.length >= 1 && (
        <>
      <Table.Row >
        <Table.Cell>B</Table.Cell>
        <Table.Cell>{ctgries[0]}</Table.Cell>
      </Table.Row>
      </>)}
      {test.length >= 2 && (
        <>
      <Table.Row >
        <Table.Cell>C</Table.Cell>
        <Table.Cell>{ctgries[1]}</Table.Cell>
      </Table.Row>
      </>)}
      {test.length >= 3 && (
        <>
      <Table.Row >
        <Table.Cell>D</Table.Cell>
        <Table.Cell>{ctgries[2]}</Table.Cell>
      </Table.Row>
      </>)}
      {test.length >= 4 && (
        <>
      <Table.Row >
        <Table.Cell>E</Table.Cell>
        <Table.Cell>{ctgries[3]}</Table.Cell>
      </Table.Row>
      </>)}
      {test.length >= 5 && (
        <>
      <Table.Row >
        <Table.Cell>F</Table.Cell>
        <Table.Cell>{ctgries[4]}</Table.Cell>
      </Table.Row>
      </>)}
      {test.length >= 6 && (
        <>
      <Table.Row >
        <Table.Cell>G</Table.Cell>
        <Table.Cell>{ctgries[5]}</Table.Cell>
      </Table.Row>
      </>)}
      {test.length >= 7 && (
        <>
      <Table.Row >
        <Table.Cell>H</Table.Cell>
        <Table.Cell>{ctgries[6]}</Table.Cell>
      </Table.Row>
      </>)}
      <Table.Row >
        <Table.Cell>{my_mark}</Table.Cell>
        <Table.Cell>End</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
        </div>
        <div className="floating-panel" id="travel-mode">
        <b>Mode of Travel:</b>
        <Dropdown
          onChange={(_, {value})=>{this.props.history.push(value)}}
          placeholder='Bicycling'
          fluid
          selection
          options={modes}
        />
        </div>
      </div>
   );
   }
};
export default withRouter(MapView);