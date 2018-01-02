import im from 'immutable';
import { LOGIN, SIGN_UP, LOGOUT, UPDATE_USER } from 'actions/auth';
import { WS_USER_UPDATES } from 'actions/socket';
import { GET_AUTO, GET_AUTO_ID } from 'actions/auto';

const initialState = {
  firstname: null,
  lastname: null,
  locale: 'az',
  loading: false,
  authenticated: false,
  error: null,
  token: null,
  autoId: null,
  notifications: [],
};

export default function (state = initialState, action) {
  switch(action.type) {
    case UPDATE_USER:
      return action.payload;
    case LOGIN:
      if(action.meta && action.meta.done && !action.meta.error) {
        return {
            ...state,
            ...action.payload.user,
            token: action.payload.token,
            authenticated: true,
            loading: false,
            error: false,
          }
      } else if(action.meta && action.meta.done && action.meta.error) {
        return {
          ...state,
          loading: false,
          error: action.meta.error
        }
      } else if(action.meta && !action.meta.done) {
        return {
            ...state,
            loading: true,
            error: false
          }
      } else {
        return state;
      }
    case SIGN_UP:
      if(action.meta && action.meta.done && !action.meta.error) {
        return {
          ...state,
          ...action.payload.user,
          token: action.payload.token,
          authenticated: true,
          loading: false,
          error: false,
        }
      } else if(action.meta && action.meta.done && action.meta.error) {
        return {
          ...state,
          loading: false,
          error: action.meta.error
        }
      } else if(action.meta && !action.meta.done) {
        return {
          ...state,
          loading: true,
          error: false
        }
      } else {
        return state;
      }
    case GET_AUTO_ID:
      if(action.meta && !action.meta.done) {
        return {
          ...state,
          loading: true
        };
      }
      return {
        ...state,
        autoId: action.payload,
        loading: false
      }
    case GET_AUTO:
      if(action.meta && !action.meta.done) {
        return {
          ...state,
          loading: true
        };
      }
      return {
        ...state,
        myauto: action.payload,
        loading: false,
      }
    case WS_USER_UPDATES:
      if(action.meta && !action.meta.prop) return state;
      return {
          ...state,
          [action.meta.prop]: action.payload
        }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}