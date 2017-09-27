import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

// import css from 'file.css';


import { createEvent } from '../../actions/events/events_action';

// import DatePicker from 'react-datepicker';

// import 'react-datepicker/dist/react-datepicker.css';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

import moment from 'moment';
import MyDropzone from '../utils/dropzone';



class EventsNew extends Component {

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
		 this.props.createEvent( values, this.state.file, this.state.date, () => {
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

		const today = new Date();
		const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);


		return (
			<form onSubmit={ handleSubmit(this.onSubmit.bind(this))}>
				<Field
					label="Event Name"
					name="eventName"
					component={this.renderField}
				/>
				<Field
					label="Description"
					name="description"
					component={this.renderField}
				/>
				<Field 
					label="Club"
					name="club"
					component={this.renderField}
				/>
				<MyDropzone onFileDrop={this.fileDrop.bind(this)}/>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
				<InfiniteCalendar 
				label="Pick Event Date"
				name="eventDate"
				onSelect={this.dateSelect.bind(this)}
			    width={400}
			    height={300}
			    selected={today}
			    disabledDays={[0,6]}
			    minDate={lastWeek} 

			   />
			</form>
		);
	}
}
	
function validate(values) {
	const errors = {};

	if(!values.eventName) {
		errors.eventName = "Enter an Event Name!";
	}
	if(!values.description){
		errors.description = "Enter a description";
	}
	if(!values.club){
		errors.club = "Enter a club";
	}
	if(!values.club){
		errors.eventDate = "Enter a date";
	}
	return errors;
}
	
export default reduxForm({
	validate,
	form: 'EventsNewForm'
})(
		connect(null, { createEvent })(EventsNew)
);
