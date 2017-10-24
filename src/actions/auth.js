import axios from 'axios';
import { REDIRECT_TO } from 'actions/ui';
import { addStorage, clearCache, CACHED_USER } from 'utils/memory';
import { rules } from 'utils/validation';

type LoginCreds = {
  login?: string,
  password?: string
}

export const LOGIN = "LOGIN";
export function login({ loginValue = '', password = '' } : LoginCreds) {
  return async dispatch => {
    let loginProp;
    if(rules.email(loginValue)) {
      loginProp = "email";
    } else if(rules.phone(loginValue)) {
      loginProp = "phone";
    } else {
      return false;
    }

    dispatch({
      type: LOGIN,
      meta: {
        done: false,
      }
    })

    try {
      const login = await axios.post('/auth/login', { [loginProp]: loginValue, password });
      const { data } = login;

      data.user.logs = data.user.logs.slice(0, 10);

      dispatch({
        type: LOGIN,
        payload: data,
        meta: {
          done: true,
        }
      })

      clearCache(CACHED_USER);
      addStorage(CACHED_USER, data);

      if(data.token) {
        dispatch({
          type: REDIRECT_TO,
          pathto: 'Profile'
        })
      }

    } catch (error) {
      dispatch({
        type: LOGIN,
        meta: {
          done: true,
          error: error.response.data || error.message
        }
      })
    }
  }
}

export const LOGOUT = "LOGOUT";
export function logout() {
  return async (dispatch, getState) => {
    
    clearCache(CACHED_USER);    
    return dispatch({
      type: LOGOUT,
      meta: {
        done: false,
      }
    })
  }
}