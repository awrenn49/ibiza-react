import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import ClubsReducer from './reducer_clubs';
import EventsReducer from './reducer_events';
import ImagesReducer from './reducer_images';
import NavBarReducer from './reducer_nav_bar';
import ClubReducer from './reducer_club';
const rootReducer = combineReducers({
  club: ClubReducer,
  clubs: ClubsReducer,
  events: EventsReducer,
  form : formReducer,
  images: ImagesReducer,
  navBarClubs: NavBarReducer,
});

export default rootReducer;
