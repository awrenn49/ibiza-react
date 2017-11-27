import _ from 'underscore';
import { connect } from 'react-redux';
import {Image, Grid, Row, Col} from 'react-bootstrap';
import React, { Component } from 'react';
import {StripeProvider} from 'react-stripe-elements';

import MyStoreCheckout from './MyStoreCheckout';


export default class Cart extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentWillMount() {

  } 

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <StripeProvider apiKey="pk_test_7hF9EqFiZKDb2xAHp0541EKj">
        <MyStoreCheckout />
      </StripeProvider>
    )
  }

}