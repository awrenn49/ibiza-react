import async from 'async';
import firebase from '../firebase';

export const FETCH_CLUB_IMAGES = 'fetch_club_images';

const storage = firebase.storage();
const clubDB = firebase.database();
const clubImageRef = clubDB.ref('clubs'); 

export function fetchClubImages(club) {
	var clubFormatted = club.toLowerCase();
	const Club = clubDB.ref(`images/club/${clubFormatted}`).orderByChild("name").equalTo(clubFormatted);

	return dispatch => {
	Club.on('value', snapshot => {
			dispatch({
				type: FETCH_CLUB_IMAGES,
				payload: snapshot.val()
			});
		});
	}
}
