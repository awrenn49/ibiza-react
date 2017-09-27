import _ from 'underscore';
import { connect } from 'react-redux';
import {Image, Col, Row} from 'react-bootstrap';
import React, { Component } from 'react';
import Slider from 'react-slick';

import ClubImages from './club_images'
import EventsIndex from '../events/events_index'

export default class ClubShow extends Component {

	render() {
		const { club } = this.props.match.params;

		//Set settings for the Sli
		const settings = {
		  dots: true,
		  infinite: true,
		  speed: 500,
		  slidesToShow: 1,
		  slidesToScroll: 1
		};
		return (
			<div>
					<Row xs={12}>
			      <Slider {...settings}>
			        <div><Image src="http://www.essentialibiza.com/ecms/wp-content/uploads/2012/10/DC-10-Close-08-10-2012-1.jpg"></Image></div>
			        <div><Image src="http://www.essentialibiza.com/ecms/wp-content/uploads/2012/10/DC-10-Close-08-10-2012-1.jpg"></Image></div>
			        <div><Image src="http://www.essentialibiza.com/ecms/wp-content/uploads/2012/10/DC-10-Close-08-10-2012-1.jpg"></Image></div>
			        <div><Image src="http://www.essentialibiza.com/ecms/wp-content/uploads/2012/10/DC-10-Close-08-10-2012-1.jpg"></Image></div>
			      </Slider>
			    </Row>
					<Row xs={12}>
						<EventsIndex club={club} />
					</Row>
			</div>
		)
	}
}