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
		$(".dropdown").hover(            
      function() {
          $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
          $(this).toggleClass('open');        
      },
      function() {
          $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
          $(this).toggleClass('open');       
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
		console.log("THIS CLUBs", this.props)
		return _.map(this.props.navBarClubs, club => {
			console.log("CLUB", club)
			return (
				<div>
						<li className="" key={club.name}><Link to={`/clubs/${club.name}`}>{club.name}</Link> </li>
				</div>
			)
		})
	}

	render() {
		// console.log("clubs", this.props.clubs)
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
								<ul className="dropdown-menu mega-dropdown-menu">
									<li className="col-sm-3">
										<ul>
											<li className="dropdown-header">Clubs</li>
											{this.renderClubLinks()}
{/*											<li><Link to={'/events/new'}>Amnesia</Link></li>
                      <li><a href="#">DC-10</a></li>
                      <li><a href="#">Pacha</a></li>
											<li><a href="#">Ushuaia</a></li>*/}
										</ul>
									</li>
								</ul>				
							</li>
						</ul>
				        <ul className="nav navbar-nav navbar-right">
				        <li className="dropdown">
				          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">My account <span className="caret"></span></a>
				          <ul className="dropdown-menu" role="menu">
				            <li><a href="#">Action</a></li>
				            <li><a href="#">Another action</a></li>
				            <li><a href="#">Something else here</a></li>
				            <li className="divider"></li>
				            <li><a href="#">Separated link</a></li>
				          </ul>
				        </li>
				        <li><a href="#">My cart (0) items</a></li>
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
	console.log("club state", state)
	return { navBarClubs: state.navBarClubs }
}
export default connect(mapStateToProps, { fetchClubs })(NavigationBar);

