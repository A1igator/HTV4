import React, {useState} from 'react';
import { css, cx } from 'emotion';
import { Button, Modal, Dropdown, Input, Form } from 'semantic-ui-react';
import useGeolocation from 'react-hook-geolocation'
import listOfCategories from './listOfCategories.txt';

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
  `,
  event: css`
    width: 200px;
    margin-bottom: 20px !important;
  `,
};

export default function Itinerary() {
  const [events, setEvents] = useState([{id: 0, name: "test", category: '', timeSpent: null}]);
  const [open, setOpen] = useState(false),
    closeModal = () => setOpen(false),
    openModal = () => setOpen(true);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [timeSpent, setTimeSpent] = useState(null);
  const [categories, setCategories] = useState([{text: ""}]);
  fetch(listOfCategories)
  .then(response => response.text())
  .then(text => setCategories(text.split("\n").map(name => {return {value: name, key: name, text: name}})));

  const geolocation = useGeolocation();

  return (
    <div className={styles.wrapper}>
      {events.map(event => (
        <Modal trigger={
          <Button className={styles.event} icon='plus' onClick={openModal}>{event.name}</Button>
        }
        open={open}
        onClose={closeModal}
        >
          <Modal.Header>{event.name}</Modal.Header>
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
                    onChange={(_, {value}) => {setTimeSpent(value)}} 
                    fluid
                    type='number'
                    defaultValue={event.timeSpent}
                    placeholder='time spent there' 
                  />
                </Form.Field>
                <Form.Field>
                  <Button onClick={() => {
                    if (timeSpent !== null && timeSpent.match(/^-{0,1}\d+$/)) {
                      setEvents(events.map(e => e.id === event.id ? {...event, name, category, timeSpent} : e)); 
                      setName('');
                      setCategory('');
                      setTimeSpent(null);
                      closeModal();
                    }
                  }}>Save</Button>
                  <Button
                    onClick={() => {
                        setEvents(events.filter(e => e.id !== event.id))
                        setName('');
                        setCategory('');
                        setTimeSpent(null);
                        closeModal();
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
      <Button className={styles.event} onClick={() => {setEvents([...events, {id: events.length !== 0 ? events[events.length - 1].id + 1 : 0, name: "", category: '', timeSpent: null}]); openModal()}} circular icon='plus'/>
      <Button onClick={() => {
        const eventsNoKeys = events.map(e => ({name: e.name, category: e.category, timeSpent: e.timeSpent}));
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
      }}>Submit</Button>
    </div>
  )
}