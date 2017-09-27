import { FETCH_EVENTS, SEARCH_EVENTS, GET_EVENTS_BY_CLUB } from '../actions/events/events_action';
import _ from 'underscore';
export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_EVENTS:
			return action.payload
		case SEARCH_EVENTS:
			//Returns the events filtered by the event name (insant search)
			const newState = state.filter((event) => {
				return event.name.toLowerCase() === action.payload.name.toLowerCase();
			})
			return newState;
		case GET_EVENTS_BY_CLUB:
			return action.payload;
	}
	return state;
}