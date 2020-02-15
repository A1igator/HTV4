import React from 'react';
import { css, cx } from 'emotion';
import { Button } from 'semantic-ui-react';
import backImg from './undraw_navigator_a479.svg';

const styles = {
  landing: css`
    background-image: url("${backImg}");
    background-repeat: no-repeat;
    background-size: 100%;
    background-color: #282C34;
    width: 50vw;
    height: 50vh;
  `,
  button: css`
    position: absolute;
    top: 53.9%;
    left: 47.5%;
  `,
};

export default function Landing() {
  return (
    <div className={styles.landing}>
      <Button className={styles.button}>Start</Button>
    </ div>
  )
}