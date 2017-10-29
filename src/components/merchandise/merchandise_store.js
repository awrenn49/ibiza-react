import { connect } from 'react-redux';
import {Image, Grid, Row, Col} from 'react-bootstrap';
import React, { Component } from 'react';
import localForage from 'localforage';

import { addCount } from '../../actions/merchandise/merchandise_action';

import MerchandiseItem from './merchandise_item';

class MerchandiseStore extends Component {
  constructor(props){
    super(props);
    this.state = {}
    this.testClick = this.testClick.bind(this);
  }

  componentWillMount() {

    console.log("props now", this.props)
  }
  testClick(e, props){
    // e.preventDefault()
    console.log("e.currentTarget", e.currentTarget)
    console.log("test props", props)
    this.props.addCount(1)
    var item = {
      description : props.description,
      price : props.price,
      imageSource : props.imageSource
    }
    localForage.getItem('merchandiseArray').then(function(value){
      value.push(item)
      console.log("value here", value)
      localForage.removeItem('merchandiseArray')
      localForage.setItem('merchandiseArray', value)
    })


  }

  render() {
    // localForage.length().then(function(length){
    //  console.log("length now", length)
    // })
   //  localForage.getItem('events').then(function(value){
   //    console.log("value get", value)
   //  })
    localForage.setItem('merchandiseArray', []);

    return (
      <Grid>
        <Row>
          <Col sm={4} smPush={4}>
            <h2 className="center-header">Ibiza Merchandise</h2>
          </Col>
        </Row>
        <Row />
          <MerchandiseItem handleClick={(e, props)=>{this.testClick(e, props)}} price="$20.00" description="Ushuaia Crew Shirt" imageSource="https://lonelyplanetimages.imgix.net/mastheads/95971965.jpg?sharp=10&vib=20&w=1200" />
          <MerchandiseItem handleClick={(e)=>{this.testClick(e)}} price="$25.00" description="DC-10 Crew Shirt" imageSource="https://media-cdn.tripadvisor.com/media/photo-s/06/8d/1f/6a/linda-playa.jpg"/>
          <MerchandiseItem handleClick={(e)=>{this.testClick(e)}} price="$30.00" description="Amnesia Shirt" imageSource="https://lvs.luxury/wp-content/uploads/2015/06/1.jpg"/>
        <Row />
      </Grid>
    )
  }
}



function mapStateToProps(state){
  var self = this;
  console.log("over all state", state)
  console.log("state count", state.merchandise)
  return { merchandise: state.merchandise }
}
export default connect(mapStateToProps, { addCount })(MerchandiseStore);