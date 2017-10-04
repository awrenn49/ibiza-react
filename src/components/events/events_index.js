import _ from 'underscore';
import { connect } from 'react-redux';
import {Image, Grid, Row, Col} from 'react-bootstrap';
import React, { Component } from 'react';
import Fuse from 'fuse.js';

import { fetchEvents, fetchEvent, searchEvents } from '../../actions/events/events_action';
import firebase from '../../actions/firebase';

import Event from './event';

class EventsIndex extends Component {

	constructor(props){
		super(props);
		this.state = {
			searchedEvent : '',
			searchType: 'event',
			searchLabel: 'Search Events'
		};
		this.enterSearch = this.enterSearch.bind(this);
		this.selectSearchType = this.selectSearchType.bind(this);
		this.dateSort = this.dateSort.bind(this);
	}

	componentWillMount() {
 		this.storage = firebase.storage();
		this.props.fetchEvents(this.props.club);
	} 

	componentWillReceiveProps(nextProps) {

		console.log("Next props", nextProps)
		if(nextProps.club !== this.props.club){
			this.props.fetchEvents(nextProps.club)
		}
	}


	//Sets the type of search to be conducted
	selectSearchType(e) {
		this.setState({
			searchType: e.currentTarget.value
		})
		if(e.currentTarget.value === 'event'){
			this.setState({searchLabel: 'Search Events'})
		} else if(e.currentTarget.value === 'artist'){
			this.setState({searchLabel: 'Search By Artist'})
		} else if(e.currentTarget.value === 'club'){
			this.setState({searchLabel: 'Search By Club'})
		}
	}

	//Not sure if used
	enterSearch(e) {
		// console.log("e key", e.key)
		// if(e.key === 'Enter'){
			this.setState({searchedEvent : e.target.value})
		// }
	}

	//Sort events by most recent date
	dateSort(a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
	}

	renderPosts() {

		function eventOptions (keyType) {
			var options; 
			return options = {
			  shouldSort: true,
			  threshold: 0.6,
			  location: 0,
			  distance: 100,
			  maxPatternLength: 32,
			  minMatchCharLength: 2,
			  keys: [
			    keyType
				]				
			}
		};

		var clubOption

		// this.stateSet({events: this.props.events})
		console.log("This Events", this.props.events)
		let events = this.props.events;
		let searchType = this.state.searchType;

		if(this.state.searchedEvent){
			if(this.state.searchType === 'event'){
				var fuse = new Fuse(events, eventOptions('name')) 
				var result = fuse.search(this.state.searchedEvent);
				events = result;
			} else if(this.state.searchType === 'club'){
				var fuse = new Fuse(events, eventOptions('club')) 
				var result = fuse.search(this.state.searchedEvent);
				events = result;
			}
		}

		console.log("HERE NOWs", events.length)
			if(events.length){
				events.sort(this.dateSort)
			}
			// if(events){
			// 	this.customSort(events)
			// }
		// events = this.customSort(events);

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

	render() {
		return (
			<Grid>
				<Row>
					<Row>
						<Col sm={4}>
							{this.state.searchLabel} <input onKeyPress={this.enterSearch} />
						</Col>
					</Row>
					<Row>
						<Col sm={1}>
							<label>
							  <input type="radio" value="event" checked={this.state.searchType === 'event'} onChange={this.selectSearchType} /> Event
							</label>
						</Col>
						<Col sm={1}>
							<label>
							  <input type="radio" value="club" checked={this.state.searchType === 'club'} onChange={this.selectSearchType} /> Club
							</label>
						</Col>
		      </Row>
				</Row>
				<Row>
					<ul key={name} className="list-group">
						{this.renderPosts()}
					</ul>
				</Row>
			</Grid>
		)
	}
}


function mapStateToProps(state){
	var self = this;
	return { events: state.events }
}
export default connect(mapStateToProps, { fetchEvents, searchEvents })(EventsIndex);