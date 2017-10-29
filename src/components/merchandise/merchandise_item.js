import {Image, Grid, Row, Col} from 'react-bootstrap';
import React from 'react';
import Moment from 'moment'; 

import localForage from 'localforage';

const Activity = (props) => {

  return(
    <Col sm={4}>
      <p>{props.description}</p>
      <Image onClick={e => props.handleClick(e, props)} value={props.price} src={props.imageSource} className="activity-image margin-bottom-5"/>
    </Col>
  )
}

export default Activity;
