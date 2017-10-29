// CheckoutForm.js
import {Image, Grid, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import { Field, reduxForm } from 'redux-form';


import CardSection from './CardSection';

class CheckoutForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {valid : 'valid'};
    this.validate = validate.bind(this);
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

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

  onSubmit = (values) => {
    console.log("values", values)
    this.setState({valid : 'not valid'})

    if(this.state.valid == 'valid'){
      this.props.stripe.createToken({name: 'Austin Wrenn'}).then(function(result) {
        if(result.error) {
          var testOut = result.error.message;
          console.log(testOut)
        } else{
          console.log('Received Stripe token:', result);
        }
      });
    }
  }

  render() {

    const { handleSubmit } = this.props;
    return (
      <Grid>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this))} className="card-section-form">
          <Row>
            <Col sm={3}>
              <Field
                label="First Name"
                name="firstName"
                component={this.renderField}
              />
            </Col>
            <Col sm={3}>
              <Field
                label="Last Name"
                name="lastName"
                component={this.renderField}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Field
                label="Billing Address"
                name="billingAddress"
                component={this.renderField}
              />
            </Col>
          </Row>
          <CardSection />
          <Row>
            <Col sm={4}>
              <button className="confirm-button">Confirm order</button>
            </Col>
          </Row>
        </form>
      </Grid>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.firstName) {
    errors.firstName = "Required";
  }
  if(!values.lastName) {
    errors.lastName = "Required";
  }
  if(!values.billingAddress){
    errors.billingAddress = "Required";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'CheckoutForm'
})( connect()(injectStripe(CheckoutForm)));