import im from 'immutable';
import { WS_LOGS, WS_NOTIFICATIONS, WS_USER_UPDATES, WS_REALTIME } from 'actions/socket';

const initialState = im.fromJS({
  logs: [],
  peopleOnline: []
});

export default (state = initialState, action) => {
  switch(action.type) {
    case WS_LOGS:
      return state.
        set('logs', action.payload.sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,10));

    case WS_NOTIFICATIONS:
      return state.
        set('notifications', action.payload.sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,10));
    
    case WS_REALTIME:
      if(action.meta && !action.meta.prop) return state;
      return state.
        set(action.meta.prop, action.payload);

    default:
      return state;
  }
}