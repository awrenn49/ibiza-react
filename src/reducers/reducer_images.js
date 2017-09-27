import { FETCH_CLUB_IMAGES } from '../actions/images/images_action';

export default function(state = [], action) {

	switch (action.type) {
		case FETCH_CLUB_IMAGES:
		console.log("Payload", action.payload)
			return [action.payload, ...state]
	}
	return state;
}