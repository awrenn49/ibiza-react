import _ from 'underscore';
import { connect } from 'react-redux';
import {Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import firebase from '../../actions/firebase';
import { fetchClub } from '../../actions/clubs/clubs_action';

class ClubHeader extends Component {

	constructor(props){
		super(props);
	}

	componentWillMount() {
		this.props.fetchClub(this.props.club);
	} 

	componentWillReceiveProps(nextProps) {
		if(nextProps.club !== this.props.club){
			this.props.fetchClub(nextProps.club)
		}
	}

	render() {
		console.log("this props", this.props)
		const selectedClub = this.props.selectedClub;
		if(selectedClub[0]){
			var imageURL = selectedClub[0].logoURL;
			return <Image src={imageURL} className="event-image" responsive/>
		} else {
			return <div></div>
		}
	}
}


function mapStateToProps(state){
	console.log("THIS STATE", state)
	return { selectedClub: state.club }
}
export default connect(mapStateToProps, { fetchClub })(ClubHeader);