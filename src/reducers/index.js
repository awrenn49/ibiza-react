import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import ClubReducer from './reducer_club';
import ClubsReducer from './reducer_clubs';
import EventsReducer from './reducer_events';
import ImagesReducer from './reducer_images';
import MerchandiseReducer from './reducer_merchandise'
import NavBarReducer from './reducer_nav_bar';
const rootReducer = combineReducers({
  club: ClubReducer,
  clubs: ClubsReducer,
  events: EventsReducer,
  form : formReducer,
  images: ImagesReducer,
  merchandise: MerchandiseReducer,
  navBarClubs: NavBarReducer
});

export default rootReducer;
