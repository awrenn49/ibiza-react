import { connect } from 'react-redux';
import React, { Component } from 'react';

import { addEventImageFile } from '../../actions/events/events_action'

const Dropzone = require('react-dropzone');

class MyDropzone extends Component {

	onDrop(files) {
		// const reader = new FileReader();
		// const file = reader(files[0]);
		// this.props.addEventImageFile(files[0], files[0].name);
		this.props.onFileDrop(files[0]);
	}

	render() {
		return (
			<div>
				<Dropzone onDrop={this.onDrop.bind(this)}>
					<div>Try dropping a file here</div>
				</Dropzone>
			</div>
		)
	}
}


export default connect(null, { addEventImageFile })(MyDropzone);