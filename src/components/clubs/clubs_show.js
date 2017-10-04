import _ from 'underscore';
import { connect } from 'react-redux';
import {Image, Grid, Row, Col} from 'react-bootstrap';
import React, { Component } from 'react';
import Slider from 'react-slick';

import ClubHeader from './club_header';
import ClubImages from './club_images';
import EventsIndex from '../events/events_index';

export default class ClubShow extends Component {

	render() {
		const { club } = this.props.match.params;
		return (
			<Grid>
				<Row className="club-logo">
					<ClubHeader club={club} />
				</Row>
				<Row className="top-buffer">
					<EventsIndex club={club} />
				</Row>
			</Grid>
		)
	}
}