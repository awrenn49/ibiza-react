import {Image, Grid, Row, Col} from 'react-bootstrap';
import React from 'react';
import Moment from 'moment'; 

import localForage from 'localforage';

const Activity = (props) => {

  return(
    <Col sm={4}>
      <p className="activity-description">{props.description}</p>
      <Image onClick={props.handleClick} value={props.description}  src={props.imageSource} className="activity-image margin-bottom-5"/>
    </Col>
  )
}

export default Activity;
