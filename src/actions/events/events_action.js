import _ from 'underscore';
import async from 'async';
import firebase from '../firebase';
var firestore2 = require('firebase/firestore');

const firestore = firebase.firestore();
const storage = firebase.storage();

var clubDB = firebase.database();
var events = firestore.collection('events');

export const ADD_EVENT_IMAGE_FILE = 'add_event_image';
export const CREATE_EVENT = 'create_event';
export const FETCH_EVENTS = 'fetch_events';
export const SEARCH_EVENTS ='search_events';


//Gives user the ability to create an event with a corresponding image, date, and details
export function createEvent(values, file, date) {
	const eventImagesRef = storage.ref().child('/eventImages/' + file.name);
	//Push event to image to firebase database
	eventImagesRef.put(file).then(function(snapshot){
		//Push event to firebase database events
		const Event = events.add({
			name: values.eventName,
			description: values.description,
			club: values.club.toLowerCase(),
			date: date,
			fileURL: snapshot.metadata.downloadURLs[0]
		})
	})
	return dispatch => {
		dispatch({
			type: CREATE_EVENT,
			payload: Event			
		})
	}
}


//Fetches all events or a singular event based on the parameter passed (ordered by date [eventually])
export function fetchEvents(club) {
	const Events = club ? events.where("club", "==", club.toLowerCase()) : events;
	// const Events = club ?  clubDB.ref('events').orderByChild("club").equalTo(club.toLowerCase()) : clubDB.ref('events');
	const storage = firebase.storage();
	return dispatch => {
		Events.get().then(querySnapshot => {
			//After event(s) returned fetch the url of the file in Firebase Storage
			var events = querySnapshot.docs.map(function (documentSnapshot) {
			  return documentSnapshot.data();
			});
			async.map(events, function(event, callback) {
				const eventImageRef = storage.refFromURL(event.fileURL);
				eventImageRef.getDownloadURL().then(url => {
					event.url = url;
					callback(null, event)
				})
			}, function (err, results) {
					dispatch({
						type: FETCH_EVENTS,
						payload: results
					})
			});
		})
	}
}

/*export function getEventsByClub(club) {
	const Events = clubDB.ref('events').orderByChild('club').equalTo('Amnesia');

	return dispatch => {
		Events.on('value', snapshot => {
			dispatch({
				type: GET_EVENTS_BY_CLUB,
				payload: snapshot.val()
			})
		})
	}
}*/
