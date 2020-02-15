import React, {useState} from 'react';
import { css, cx } from 'emotion';
import { Button, Modal, Dropdown, Input } from 'semantic-ui-react'
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
  const [events, setEvents] = useState([{name: "test"}, {name: "test2"}]);
  const [categories, setCategories] = useState([{text: ""}]);
  fetch(listOfCategories)
  .then(response => response.text())
  .then(text => setCategories(text.split("\n").map(name => {return {value: name, key: name, text: name}})));

  return (
    <div className={styles.wrapper}>
      {events.map(event => (
        <Modal trigger={
          <Button className={styles.event} icon='plus'>{event.name}</Button>
        }>
          <Modal.Header>{event.name}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Input fluid placeholder='Name' />
              <Dropdown
                placeholder='Select Category'
                fluid
                search
                selection
                options={categories}
              />
              <Dropdown
                placeholder='Select Mode of Transportation'
                fluid
                multiple
                search
                selection
                options={[{value: "walk", text: "walk"}, {value: "car", text: "car"}, {value: "bus", text: "bus"}]}
              />
            </Modal.Description>
          </Modal.Content>
        </Modal>
        ))
      }
      <Button onClick={() => {setEvents([...events, "test3"])}} circular icon='plus'/>
    </div>
  )
}