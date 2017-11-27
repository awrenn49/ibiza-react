import _ from 'underscore';
import { connect } from 'react-redux';
import React, { Component  } from 'react';
import {Image, Grid, Row, Col, Button} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { addCount, addMerchandise } from '../../actions/merchandise/merchandise_action';

class MerchandiseModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      size: 'Sm'
    };

    this.addToCart = this.addToCart.bind(this);
    this.selectSize = this.selectSize.bind(this);
    this.renderDetailList = this.renderDetailList.bind(this);
  }

  addToCart(){
    this.props.addCount();
    var merchandiseItem = {
      title: this.props.title,
      price: this.props.price,
      longDescription: this.props.longDescription,
      imageSource: this.props.imageSource,
      size: this.state.size
    }
    this.props.addMerchandise(merchandiseItem)
  }

  selectSize(size){
    this.setState({size : size.value})

    console.log('size', size.value)
  }

  renderDetailList(){

    return _.map(this.props.details, detail => {
      console.log(detail)
      return(
        <li className="margin-bottom-10">{detail}</li>
      )
    })
  }
  

  render(){
    console.log("props in modal: ", this.props)

    var options = [];
    _.each(this.props.sizes, function(size){
      options.push({ value: size, label: size})
    })


    return(
      <Grid>
        <Row>
          <p className="activity-description">{this.props.title}</p>
        </Row>
        <Row>
          <Col sm={8}>
            <div className="merchandise-modal-container">
              <Image 
                src={this.props.imageSource} 
                className="merchandise-modal-image margin-bottom-5"
              />
            </div>
          </Col>
          <Col sm={4}>
            <Row>
              <Col sm={10}>
                <Select  
                  name="form-field-name"
                  value={this.state.size}
                  options={options}
                  onChange={this.selectSize}
                />
              </Col>        
            </Row>
            <Row>
              <Col sm={12}>
                <ul>
                  {this.renderDetailList()}
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <p className="merchandise-long-description">{this.props.longDescription}</p>
        </Row>
        <Row>
          <Button bsStyle="success" bsSize="large" className="purchase-btn" onClick={this.addToCart}>Add to Cart</Button>
        </Row>
      </Grid>
    )
  }
}


function mapStateToProps(state){
  var self = this;
  return { merchandise: state.merchandise }
}
export default connect(mapStateToProps, { addCount, addMerchandise })(MerchandiseModal);