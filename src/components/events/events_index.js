import _ from 'underscore';
import { connect } from 'react-redux';
import {Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import { fetchEvents, fetchEvent, searchEvents } from '../../actions/events/events_action';
import firebase from '../../actions/firebase';

import Event from './event';

class EventsIndex extends Component {

	constructor(props){
		super(props);
		this.state = {searchedEvent : ''};
	  this.enterSearch = this.enterSearch.bind(this);
	}

	componentWillMount() {
 		this.storage = firebase.storage();
		this.props.fetchEvents(this.props.club);
	} 

	componentWillReceiveProps(nextProps) {

		if(nextProps.club !== this.props.club){
			this.props.fetchEvents(nextProps.club)
		}
	}

	renderPosts() {

		// this.stateSet({events: this.props.events})
		let events = this.props.events;
		if(this.state.searchedEvent){
			events = events.filter(event => {
				return event.name.toLowerCase().startsWith(this.state.searchedEvent.toLowerCase())
			})
		}

		return _.map(events, event => {
			return (
				<div>
						<li className="list-group-item event-item" >
							<Event key={event.name} event={event} className="event-image"/>
						</li>
				</div>
			)
		})
	}

	enterSearch(e) {
		this.setState({searchedEvent : e.target.value})
		// this.props.history.push('/events/new')
	}

	render() {
		return (
			<div>
				<input onKeyUp={this.enterSearch} />
				<ul key={name} className="list-group">
					{this.renderPosts()}
				</ul>
			</div>

		)
	}
}


function mapStateToProps(state){
	var self = this;
	return { events: state.events }
}
export default connect(mapStateToProps, { fetchEvents, searchEvents })(EventsIndex);