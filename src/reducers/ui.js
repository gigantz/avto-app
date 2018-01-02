import im from 'immutable';
import { TABS_TRIGGER } from 'actions/ui';
import { LOGIN, LOGOUT } from 'actions/auth';

const initialState = im.fromJS({
  tabsVisible: false,
});

export default function (state = initialState, action) {
  switch(action.type) {
    case TABS_TRIGGER:
      return state
        .set('tabsVisible', action.payload.show);
    case LOGIN:
      if(action.meta && action.meta.done && !action.meta.error) {
        return state
        .set('tabsVisible', true);
      }
    case LOGOUT:
      if(action.meta && action.meta.done && !action.meta.error) {
        return state
        .set('tabsVisible', false);
      }
    default:
      return state;
  }
}