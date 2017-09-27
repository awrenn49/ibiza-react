import _ from 'underscore';
import { connect } from 'react-redux';
import {Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import firebase from '../../actions/firebase';
import { fetchClubImages } from '../../actions/images/images_action';

class ClubImages extends Component {

	constructor(props){
		super(props);
		this.state = {images : []};
	}

	componentWillMount(){
		this.props.fetchClubImages(this.props.club)
	}

	render() {

		var images = this.props.images

		
		if(images.length === 0){
			return <div>Loading...</div>
		} else if(images.length >  0){

			var arr = [];

			for(let image of images) {
				if(image){
					var imageObjectKey = Object.keys(image)[0];
					var imageURL = image[imageObjectKey].fileURL;
					return <Image src={imageURL} className="event-image" responsive/>
					debugger					
				}
			}

			
		}
	}
}


function mapStateToProps(state){
	return { images: state.images }
}
export default connect(mapStateToProps, { fetchClubImages })(ClubImages);