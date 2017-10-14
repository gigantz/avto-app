import im from 'immutable';
import { REDIRECT_TO } from 'actions/ui';
import { LOGOUT } from 'actions/auth';

const initialState = im.fromJS({
  page: 'login'
});

export default function (state = initialState, action) {
  switch(action.type) {
    case REDIRECT_TO:
      return state.set('page', action.payload);
    case LOGOUT:
      return state.set('page', 'login');
    default:
      return state;
  }
}