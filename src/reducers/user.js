import im from 'immutable';
import { LOGIN, LOGOUT } from 'actions/auth';

const initialState = im.fromJS({
  firstname: null,
  lastname: null,
  locale: 'az',
  loading: true,
  authenticated: false,
  error: null,
  token: null,
});

export default function (state = initialState, action) {
  switch(action.type) {
    case LOGIN:
      if(action.meta && action.meta.done && !action.meta.error) {
        return state
          .merge({ ...action.payload.user, token: action.payload.token })
          .set('authenticated', true)
          .set('loading', false)
          .remove('error')
      } else if(action.meta && action.meta.done && action.meta.error) {
        return state
          .set('error', action.meta.error)
          .remove('loading')
      } else if(action.meta && !action.meta.done) {
        return state
          .remove('error')
          .set('loading', true)
      } else {
        return state;
      }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}