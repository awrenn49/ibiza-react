import {Image, Grid, Row, Col} from 'react-bootstrap';
import React from 'react';
import Moment from 'moment'; 

import localForage from 'localforage';

const Activity = (props) => {

  return(
    <Col sm={4}>
      <div className="merchandise-block">
        <p className="merchandise-title">{props.title}</p>
        <div className="merchandise-container margin-bottom-5">
          <Image onClick={e => props.handleClick(e, props)} value={props.price} src={props.imageSource} className="merchandise-image margin-bottom-5"/>
        </div>
      </div>
    </Col>
  )
}

export default Activity;
