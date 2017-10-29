import { Field, reduxForm } from 'redux-form';
import {Image, Grid, Row, Col} from 'react-bootstrap';
import React from 'react';
import {CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement } from 'react-stripe-elements';

class CardSection extends React.Component {

  render() {
    return (
      <Row>
        <Col sm={6}>
          <label className="card-section-form">
            <CardElement id="test-id" className="stripe-element" style={{
                base: {
                  iconColor: '#0000FF',
                  color: '#101010',
                  lineHeight: '48px',
                  fontWeight: 400,
                  fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
                  fontSize: '22px',

                  '::placeholder': {
                    color: '#9d9d9d',
                    lineHeight: '72px'
                  }
                },
                empty: {
                }
            }} />
          </label>
        </Col>
      </Row>
    );
  }
};

export default CardSection;