// export file for all reducer files
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import NavReducer from './NavReducer';
import EventReducer from './EventReducer';
import VenueReducer from './VenueReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
  nav: NavReducer,
  auth: AuthReducer,
  events: EventReducer,
  venues: VenueReducer,
  search: SearchReducer,
});
