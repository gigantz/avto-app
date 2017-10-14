import axios from 'axios';
import { REDIRECT_TO } from 'actions/ui';
import { addStorage, clearCache, CACHED_USER } from 'utils/memory';

type LoginCreds = {
  email?: string,
  password?: string
}

export const LOGIN = "LOGIN";
export function login({ email = '', password = '' } : LoginCreds) {
  return async dispatch => {

    dispatch({
      type: LOGIN,
      meta: {
        done: false,
      }
    })

    try {
      const login = await axios.post('/auth/login', { email, password });
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
          payload: 'profile'
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