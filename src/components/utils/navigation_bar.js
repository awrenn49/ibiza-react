import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';
import{Nav} from 'react-bootstrap';
import {NavBar} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchClubs } from '../../actions/clubs/clubs_action';

import _ from 'underscore';

import $ from 'jquery';

class NavigationBar extends Component {

	componentDidMount(){
		this.props.fetchClubs();

		console.log("nav bar props", this.props)
		$(".dropdown").hover(    

	      function() {
    			if(!$(this).hasClass('open')){
    				$('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
	          $(this).toggleClass('open'); 
					} else {
    				$('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
	          $(this).toggleClass('open'); 
					}
       
	      }
	    );
	}

	constructor(props) {
		super(props);

		this.state = {};
	}

	onNavigationSelection(selection) {
		this.props.history.push('/');

	}

	renderClubLinks() {
		return _.map(this.props.navBarClubs, club => {
			return (
				<div key={club.name}>
					<li className="" key={club.name}><Link key={club.name} to={`/clubs/${club.name}`}>{club.name}</Link> </li>
				</div>
			)
		})
	}

	render() {
		return (
			<div>
			<div>
			  <nav className="navbar navbar-inverse">
			    <div className="navbar-header">
			    	<button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".js-navbar-collapse">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link  className="navbar-brand" to={`/`}>Ibiza Fire</Link>
					</div>
					
					<div className="collapse navbar-collapse js-navbar-collapse">
						<ul className="nav navbar-nav">
							<li className="dropdown mega-dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown">Clubs <span className="caret"></span></a>				
								<ul id="firstList" className="dropdown-menu mega-dropdown-menu">
									<li className="col-sm-3">
										<ul>
											<li className="dropdown-header">Clubs</li>
											{this.renderClubLinks()}
										</ul>
									</li>
								</ul>				
							</li>
						</ul>
				        <ul className="nav navbar-nav navbar-right">
				        <li className="dropdown">
				          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">My account <span className="caret"></span></a>
				          <ul id="otherList" className="dropdown-menu" role="menu">
				            <li><a href="#">Action</a></li>
				            <li><a href="#">Another action</a></li>
				            <li><a href="#">Something else here</a></li>
				            <li className="divider"></li>
				            <li><a href="#">Separated link</a></li>
				          </ul>
				        </li>
				        <li><Link to={'/ibiza_merchandise'}>Merchandise</Link></li>
				        <li><Link to={'/explore_ibiza'}>Explore Ibiza</Link></li>
				        <li><Link to={'/cart'} >My cart (0) items</Link></li>
				      </ul>
					</div>
				  </nav>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	var self = this;
	return { navBarClubs: state.navBarClubs, merchandiseCount: state.merchandise }
}
export default connect(mapStateToProps, { fetchClubs })(NavigationBar);

