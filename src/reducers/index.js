import { combineReducers } from 'redux';
import ui from './ui';
import user from './user';
import auto from './auto';

export default combineReducers({
  ui,
  user,
  auto,
});