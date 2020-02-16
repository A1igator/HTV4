import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import './MapView.css';
import useGeolocation from 'react-hook-geolocation';
const { compose, withProps, lifecycle, withStateHandlers } = require("recompose");
const {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} = require("react-google-maps");
let my_mode = window.google.maps.TravelMode.WALKING;
  var test = [
     ['ChIJiRLw_wdIK4gRmgkLJuA61Xg','Loading...','Loading...'],
     ['ChIJiRLw_wdIK4gRmgkLJuA61Xg','Loading...','Loading...']
  //  ['ChIJFRRC17Q2K4gRrDLxhzRnQJ4','35','Zoo'],
  //   ['ChIJ44AtJc00K4gRnPYkPlAQ648','70','Store'],
  //    ['ChIJxc6GqN3M1IkR5KeSVS1QcOY','25','School'],
  //     ['ChIJo6RbIvLZ1IkRfVHfYVKwK1M','5','Aquarium']
    ]; 

let testing = false;

class MapView extends Component {
   render() {
    testing = !testing;
    console.log("HEY",my_mode,this.props.timetable);
    if(this.props.timetable.response){
      test = this.props.timetable.response;
      console.log("test",test);
    }
    let MapWithADirectionsRenderer = compose(
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          console.log('test');
          let DirectionsService = new window.google.maps.DirectionsService();
          var wypnts = [];
          for (var i = 0; i < test.length; i++)
          {
            wypnts.push({
              location: {'placeId': test[i][0]}
            });
          }
          console.log("RECALCULATING WYPNTS",test);
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
        value: window.google.maps.TravelMode.DRIVING,
        //image: { avatar: true, src: 'https://imgur.com/QknR12N' },
      },
      {
        key: 'WALKING',
        text: 'Walking',
        value: window.google.maps.TravelMode.WALKING
        //image: { src: '/transport_icons/a.jpg' },
      },
      {
        key: 'BIKING',
        text: 'Biking',
        value: 'BIKING',
        //image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
      },
      {
        key: 'TRANSIT',
        text: 'Transit',
        value: 'TRANSIT',
       // image: { avatar: true, src: '/images/avatar/small/christian.jpg' },
      }
    ];
    var ctgries = [];
    for (var i = 0; i < test.length; i++)
    {
      ctgries.push(test[i][2]);
    }
    var arv_times = [];
    for (var i = 0; i < test.length; i++)
    {
      arv_times.push(test[i][1]);
    }

   return(
      <div>
        {testing && <MapWithADirectionsRenderer
          containerElement={ <div style={{ height: `100vh`, width: '100vw' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />}
        <div className="info-table">
        <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Location</Table.HeaderCell>
        <Table.HeaderCell>Category</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row >
        <Table.Cell>A</Table.Cell>
        <Table.Cell>{ctgries[0]}</Table.Cell>
      </Table.Row>
      {test.length >= 2 && (
        <>
      <Table.Row >
        <Table.Cell>B</Table.Cell>
        <Table.Cell>{ctgries[1]}</Table.Cell>
      </Table.Row>
      </>)}
      {test.length >= 3 && (
        <>
      <Table.Row >
        <Table.Cell>C</Table.Cell>
        <Table.Cell>{ctgries[2]}</Table.Cell>
      </Table.Row>
      </>)}
      {test.length >= 4 && (
        <>
      <Table.Row >
        <Table.Cell>D</Table.Cell>
        <Table.Cell>{ctgries[3]}</Table.Cell>
      </Table.Row>
      </>)}
      {test.length >= 5 && (
        <>
      <Table.Row >
        <Table.Cell>E</Table.Cell>
        <Table.Cell>{ctgries[4]}</Table.Cell>
      </Table.Row>
      </>)}
      {test.length >= 6 && (
        <>
      <Table.Row >
        <Table.Cell>F</Table.Cell>
        <Table.Cell>{ctgries[5]}</Table.Cell>
      </Table.Row>
      </>)}
      {test.length >= 7 && (
        <>
      <Table.Row >
        <Table.Cell>G</Table.Cell>
        <Table.Cell>{ctgries[6]}</Table.Cell>
      </Table.Row>
      </>)}
      {test.length >= 8 && (
        <>
      <Table.Row >
        <Table.Cell>H</Table.Cell>
        <Table.Cell>{ctgries[7]}</Table.Cell>
      </Table.Row>
      </>)}
      {test.length >= 9 && (
        <>
      <Table.Row >
        <Table.Cell>I</Table.Cell>
        <Table.Cell>{ctgries[8]}</Table.Cell>
      </Table.Row>
      </>)}
    </Table.Body>
  </Table>
        </div>
        <div className="floating-panel" id="travel-mode">
        <b>Mode of Travel:</b>
        <Dropdown
          onChange={(_, {value})=>{}}
          placeholder='Driving'
          fluid
          selection
          options={modes}
        />
        </div>
      </div>
   );
   }
};
export default MapView;