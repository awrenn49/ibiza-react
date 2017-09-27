import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createClubImage } from '../../actions/clubs/clubs_action';

import MyDropzone from '../utils/dropzone';

class ClubImagesNew extends Component {

	constructor(props) {
		super(props);

		this.state = { file: '', date: ''};
	}

	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error
																			? 'has-danger' : ''}`
		return (
			<div className = { className }>
				<label>{field.label}</label>
				<input
					className="form-control"
					type="text"
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values){
		 this.props.createClubImage( values, this.state.file, this.state.date, () => {
		 		this.props.history.push('/')
		 });
	}

	fileDrop(file){
		this.setState({file})
	}

	dateSelect(date){
		console.log("date", date)
		this.setState({date})
	}


	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={ handleSubmit(this.onSubmit.bind(this))}>
				<Field
					label="Club Name"
					name="clubName"
					component={this.renderField}
				/>
				<Field
					label="Description"
					name="description"
					component={this.renderField}
				/>
				<MyDropzone onFileDrop={this.fileDrop.bind(this)}/>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}
	
function validate(values) {
	const errors = {};

	if(!values.clubName) {
		errors.clubName = "Enter an Club Name!";
	}
	if(!values.description){
		errors.description = "Enter a description";
	}
	return errors;
}
	
export default reduxForm({
	validate,
	form: 'ClubImagesNewForm'
})(
		connect(null, { createClubImage })(ClubImagesNew)
);
