import {Image} from 'react-bootstrap';
import React from 'react';

const Event = (props) => {
    return(
        <div>
            <Image src={props.event.url} className="event-image" responsive/>
            <p className="description" > {props.event.description}</p>
        </div>
    )
}

export default Event;
