import async from 'async';
import firebase from '../firebase';

export const CREATE_CLUB_IMAGE = 'create_club_image';
export const FETCH_CLUB = 'fetch_club';
export const FETCH_CLUBS = 'fetch_clubs';

const clubDB = firebase.database();
const storage = firebase.storage();

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
	console.log("fetch club hit", club)
	var clubLowerCase = club.toLowerCase();
	let Club = clubDB.ref('clubs').orderByChild('name').equalTo(clubLowerCase);
	console.log("CLUB", Club)
	return dispatch => {
		Club.on('value', snapshot => {
			//After event(s) returned fetch the url of the file in Firebase Storage
			async.map(snapshot.val(), function(club, callback) {
				console.log("Club action", club)
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
	const Club = clubDB.ref('clubs');
	return dispatch => {
		Club.on('value', snapshot => {
			dispatch({
				type: FETCH_CLUBS,
				payload: snapshot.val()
			})
		})
	}
}
