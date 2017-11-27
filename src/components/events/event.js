import {Image, Grid, Row, Col} from 'react-bootstrap';
import React from 'react';
import Moment from 'moment'; 


const Event = (props) => {
		var moment = new Moment(props.event.date);
		var mFormat = moment.format('MMMM Do YYYY, h:mm')
    return(
      <div>
    		<p className="margin-bottom-5">{mFormat}</p>
        <Image src={props.event.url} className="event-image margin-bottom-5" responsive/>
        <p className="description event-description" > {props.event.description}</p>
      </div>
    )
}

export default Event;
