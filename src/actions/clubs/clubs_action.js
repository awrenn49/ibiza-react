import async from 'async';
import firebase from '../firebase';

export const CREATE_CLUB_IMAGE = 'create_club_image';
export const FETCH_CLUBS = 'fetch_clubs';

const storage = firebase.storage();
const clubDB = firebase.database();

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


export function fetchClubs() {
	const Club = clubDB.ref('clubs');
	return dispatch => {
		Club.on('value', snapshot => {
			console.log("Snappy", snapshot)
			dispatch({
				type: FETCH_CLUBS,
				payload: snapshot.val()
			})
		})
	}
}