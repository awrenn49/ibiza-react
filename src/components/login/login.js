import React, { Component } from 'react';
import firebaseApp from '../../actions/firebase';
import firebase from 'firebase'
import firebaseui from 'firebaseui';
// import 'firebaseui.css';

var provider = new firebase.auth.GoogleAuthProvider();

export default class LoginPage extends Component {

	constructor(props){
		super(props);
	}


	render() {
		var provider = new firebase.auth.GoogleAuthProvider();
	  var uiConfig = {
      signInSuccessUrl: 'http://localhost:8080/',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>'
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);

		return (
			<div>
				<h1>Welcome to My Awesome App</h1>
				<div id='firebaseui-auth-container'></div>
			</div>
		)
	}
}