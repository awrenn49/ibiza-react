import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import ClubsReducer from './reducer_clubs';
import EventsReducer from './reducer_events';
import ImagesReducer from './reducer_images';
import NavBarReducer from './reducer_nav_bar';
const rootReducer = combineReducers({
  clubs: ClubsReducer,
  events: EventsReducer,
  images: ImagesReducer,
  navBarClubs: NavBarReducer,
  form : formReducer
});

export default rootReducer;
