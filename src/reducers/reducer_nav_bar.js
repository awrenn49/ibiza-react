import { FETCH_CLUBS } from '../actions/clubs/clubs_action';

//reducer for information passed into the navigation bar
export default function(state = [], action) {
	switch (action.type) {
		case FETCH_CLUBS:
			console.log("Navbar payload", action.payload)
			return action.payload
	}
	return state;
}