import { combineReducers } from 'redux';
import ui from './ui';
import user from './user';
import auto from './auto';
import realtime from './socket';
import router from './router.reducer';

export default combineReducers({
  ui,
  user,
  auto,
  realtime,
  router
});