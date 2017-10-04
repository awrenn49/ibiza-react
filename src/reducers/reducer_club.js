import _ from 'underscore';

import { FETCH_CLUB } from '../actions/clubs/clubs_action';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_CLUB:
			console.log("Club Payload", action.payload)
			return action.payload
	}
	return state;
}