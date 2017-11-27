import { connect } from 'react-redux';
import {Image, Grid, Row, Col, Button} from 'react-bootstrap';
import React, { Component } from 'react';
import Modal from 'react-modal';
import _ from 'underscore';

import { addCount, getMerchandise } from '../../actions/merchandise/merchandise_action';

import localForage from 'localforage';
import MerchandiseItem from './merchandise_item';
import MerchandiseModal from './merchandise_modal';


const customStyles = {
  content : {
    width : '700px',
    height : '700px',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class MerchandiseStore extends Component {

  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false,
      price: '',
      imageSource: '',
      description: '',
      longDescription: '',
      title: '',
      sizes: '',
      details: ''
    }

    this.openMerchandiseModal = this.openMerchandiseModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.renderMerchandiseItems = this.renderMerchandiseItems.bind(this);
  }

  componentWillMount(){
    this.props.getMerchandise()
  }

  openMerchandiseModal(e, props){
    this.setState({price : props.price});
    this.setState({imageSource : props.imageSource});
    this.setState({description : props.description});
    this.setState({longDescription : props.longDescription});
    this.setState({title: props.title});
    this.setState({sizes: props.sizes});
    this.setState({details: props.details});
    this.setState({modalIsOpen: true});
  }


  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal(test) {
    this.setState({modalIsOpen: false});
  }

  addToCart(e, props){
    console.log("add to cart", props)
  } 

  renderMerchandiseItems(){
    return _.map(this.props.merchandiseItems, (item, index) => {
      console.log("index", index)
      console.log("item", item)
      return (
        <MerchandiseItem 
          key={item.title}
          handleClick={(e, props)=>{this.openMerchandiseModal(e, props)}} 
          price={item.price}
          title={item.title}
          imageSource={item.imageSourceURL}
          sizes={item.sizes}
          details={item.details}
          longDescription="This shirt is great!"
        />
      )
    })
  }

  render() {


    return (
      <Grid>
        <Row>
          <Col sm={4} smPush={4}>
            <h2 className="merchandise-store-title center-header">Ibiza Merchandise</h2>
          </Col>
        </Row>
        {this.renderMerchandiseItems()}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <Image className="close-icon" onClick={this.closeModal} src="http://www.iconarchive.com/download/i85560/graphicloads/100-flat/close.ico"></Image>
        <MerchandiseModal 
          price={this.state.price} 
          imageSource={this.state.imageSource}
          description={this.state.description}
          longDescription={this.state.longDescription}
          sizes={this.state.sizes}
          details={this.state.details}
          title={this.state.title}
          handleClick={(e, props)=>{this.addToCart(e, props)}} 
        />
        </Modal>
      </Grid>
    )
  }
}



function mapStateToProps(state){
  var self = this;
  console.log("merchandise store state", state)
  return { merchandiseItems: state.merchandise.merchandiseItems }
}
export default connect(mapStateToProps, { addCount, getMerchandise })(MerchandiseStore);