import async from 'async';
import firebase from '../firebase';
var firestore2 = require('firebase/firestore');

export const CREATE_CLUB_IMAGE = 'create_club_image';
export const FETCH_CLUB = 'fetch_club';
export const FETCH_CLUBS = 'fetch_clubs';

const clubDB = firebase.database();
const storage = firebase.storage();
const firestore = firebase.firestore();

export function createClubImage(values, file, date) {
	const clubImagesRef = storage.ref().child(`/clubImages/${values.clubName}/` + file.name);
	//Push event to image to firebase database
	clubImagesRef.put(file).then(function(snapshot){
		//Push event to firebase database events
		var correctName = values.clubName.toLowerCase();
		const Image = clubDB.ref(`images/club/${correctName}`).push().set({
			name: values.clubName,
			description: values.description,
			fileURL: snapshot.metadata.downloadURLs[0]
		})
	})
	return dispatch => {
		dispatch({
			type: CREATE_CLUB_IMAGE,
			payload: Image
		})
	}
}

export function fetchClub(club) {
	var clubLowerCase = club.toLowerCase();
	let Club = clubDB.ref('clubs').orderByChild('name').equalTo(clubLowerCase);
	return dispatch => {
		Club.on('value', snapshot => {
			//After event(s) returned fetch the url of the file in Firebase Storage
			async.map(snapshot.val(), function(club, callback) {
				const clubImageRef = storage.refFromURL(club.logoURL);
				clubImageRef.getDownloadURL().then(url => {
					club.url = url;
					callback(null, club)
				})
			}, function (err, results) {
					dispatch({
						type: FETCH_CLUB,
						payload: results
					})
			});
		})
	}
}

export function fetchClubs() {
	const Clubs = firestore.collection('clubs');
	var clubs = [];
	return dispatch => {
		Clubs.get().then(querySnapshot => {
			var data = querySnapshot.docs.map(function (documentSnapshot) {
			  return documentSnapshot.data();
			});
			dispatch({
				type: FETCH_CLUBS,
				payload: data
			})
		})
	}
}