import React, {useState} from 'react';
import { css, cx } from 'emotion';
import { Button, Modal, Dropdown, Input, Form } from 'semantic-ui-react';
import useGeolocation from 'react-hook-geolocation'
import { Link } from "react-router-dom";
import listOfCategories from './listOfCategories.txt';

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
  `,
  event: css`
    width: 60vw;
    margin-bottom: 20px !important;
  `,
};

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
let newColors = [...colors];
let color;

export default function Itinerary(props) {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState(null);
  const [keyWords, setKeyWords] = useState(null);
  const [categories, setCategories] = useState([{text: ""}]);
  fetch(listOfCategories)
  .then(response => response.text())
  .then(text => setCategories(text.split("\n").map(name => {return {value: name.replace('\r', ''), key: name.replace('\r', ''), text: name.replace('\r', '').replace(/_/g, " ").split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ')}})));

  const geolocation = useGeolocation();

  return (
    <div className={styles.wrapper}>
      {events.map(event => (
        <Modal closeOnDimmerClick={false} trigger={
          <Button size="massive" color={event.color} className={styles.event} icon='plus' onClick={() => event.open = true}>{event.name}</Button>
        }
        open={event.open}
        onClose={() => event.open = false}
        >
          <Modal.Header>Enter Event Information</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Field required>
                  <Input 
                    onChange={(_, {value}) => {setName(value)}} 
                    fluid
                    defaultValue={event.name}
                    placeholder='Name' 
                  />
                </Form.Field>
                <Form.Field required>
                  <Dropdown
                    placeholder='Select Category'
                    fluid
                    search
                    selection
                    defaultValue={event.category}
                    options={categories}
                    onChange={(_, {value}) => {setCategory(value)}}
                  />
                </Form.Field>
                <Form.Field required>
                  <Input 
                    onChange={(_, {value}) => {setAddress(value)}} 
                    fluid
                    defaultValue={event.address}
                    placeholder='Address' 
                  />
                </Form.Field>
                <Form.Field required>
                  <Input 
                    onChange={(_, {value}) => {setKeyWords(value)}} 
                    fluid
                    defaultValue={event.keyWords}
                    placeholder='Key Words' 
                  />
                </Form.Field>
                <Form.Field>
                  <Button
                    color="green"
                    onClick={() => {
                    if (!events.some(e => e.name === name && e.id !== event.id)) {
                      console.log('test');
                      setEvents(events.map(e => e.id === event.id ? {...event, name, category, address, open: false, keyWords} : e)); 
                      setName('');
                      setCategory('');
                      setAddress(null);
                      setKeyWords(null);
                      event.open = false;
                    } 
                    // if (event.timeSpent !== null) {
                    //   event.open = false;
                    // }
                  }}>Save</Button>
                  <Button
                    color="red"
                    onClick={() => {
                        setEvents(events.filter(e => e.id !== event.id))
                        setName('');
                        setCategory('');
                        setAddress(null);
                        setKeyWords(null);
                      }
                    }
                  >Delete</Button>
                </Form.Field>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        ))
      }
      <div className={styles.event}>
        <Button size="massive" onClick={() => {
          if (newColors.length === 0) {
            newColors = [...colors];
          }
          const index = Math.floor(Math.random() * newColors.length);
          color = newColors[index];
          newColors.splice(index, 1);
          
          setEvents([...events, {id: events.length !== 0 ? events[events.length - 1].id + 1 : 0, name: "", category: '', timeSpent: null, color, open: true}]);           
        }} circular icon='plus'/>
      </div>
      <Button disabled={events.length < 2 || events.length > 8} size="massive" inverted className={styles.event} as={Link} to="/map" onClick={() => {
        const eventsNoKeys = events.map(e => ({name: e.name, category: e.category, timeSpent: e.timeSpent, address: e.address, keyWords: e.keyWords}));
        const itinerary = {
          user: {
            location: {
              lat: geolocation.latitude,
              lng: geolocation.longitude
            }
          },
          events: eventsNoKeys,
        }
        console.log(itinerary);
        fetch('http://35.184.180.94:80/postTT', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(itinerary)
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            props.timeTableFetch(data, itinerary);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }}>Submit</Button>
    </div>
  )
}