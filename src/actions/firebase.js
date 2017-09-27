import firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyAN_7iKcvc5_-NA1N1oEDWw1VxEaNYAwYg",
    authDomain: "ibiza-project.firebaseapp.com",
    databaseURL: "https://ibiza-project.firebaseio.com",
    projectId: "ibiza-project",
    storageBucket: "ibiza-project.appspot.com",
    messagingSenderId: "876844569804"
  };
  
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();  
