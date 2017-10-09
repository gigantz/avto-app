import { combineReducers } from 'redux';
import user from './user';
import auto from './auto';

export default combineReducers({
  user,
  auto,
});