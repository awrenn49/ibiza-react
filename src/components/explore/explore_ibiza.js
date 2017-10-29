import {Image, Grid, Row, Col} from 'react-bootstrap';
import React, { Component } from 'react';
import localForage from 'localforage';

import Activity from './activity';

export default class ExploreIbiza extends Component {
	constructor(props){
		super(props);
		this.state = {}
		this.testClick = this.testClick.bind(this);
	}

	testClick(e){
		console.log("click handled", e.target.getAttribute('value'));
	}

	render() {
		return (
			<Grid>
				<Row>
					<Col sm={4} smPush={4}>
						<h2 className="center-header">Explore Ibiza</h2>
					</Col>
				</Row>
				<Row />
					<Activity handleClick={(e)=>{this.testClick(e)}} description="Dining" imageSource="https://lonelyplanetimages.imgix.net/mastheads/95971965.jpg?sharp=10&vib=20&w=1200" />
					<Activity description="Diving" imageSource="https://media-cdn.tripadvisor.com/media/photo-s/06/8d/1f/6a/linda-playa.jpg"/>
					<Activity onClick={this.handleClick} description="Boating" imageSource="https://lvs.luxury/wp-content/uploads/2015/06/1.jpg"/>
				<Row />
			</Grid>
		)
	}
}