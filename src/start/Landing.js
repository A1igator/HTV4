import React from 'react';
import { css, cx } from 'emotion';
import { Button, Image, Header } from 'semantic-ui-react';
import {
  Link
} from "react-router-dom";
import backImg from './undraw_navigator_a479.svg';

const styles = {
  landing: css`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  `,
  button: css`
    margin-top: 50px !important;
  `,
};

export default function Landing() {
  return (
    <div className={styles.landing}>
      <Image src={backImg}></Image>
      <Header inverted size="huge">Find The Best Path For Your Day</Header>
      <div>
        <Button color="violet" size="huge" as={Link} to="/itinerary" className={styles.button}>Start</Button>
      </div>
    </ div>
  )
}