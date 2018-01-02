// @flow

import axios from 'axios';
import { REDIRECT_TO } from 'actions/ui';
import { addStorage, clearCache, CACHED_USER, CACHED_AUTO } from 'utils/memory';
import { rules, emailOrPhone } from 'utils/validation';
import localize from 'localize';
import { FBLoginManager } from 'react-native-facebook-login';
import config from 'config';
import { Platform } from 'react-native';
import { getAutoById } from 'actions/auto';

type LoginCreds = {
  loginValue: string,
  password: string
};

type Action = { type: string, payload?: Object };
type Dispatch = (action: Action) => void;

export const LOGIN = 'LOGIN';
export function login({ loginValue, password }: LoginCreds) {
  return async (dispatch: Dispatch, getState: Function) => {
    dispatch({
      type: LOGIN,
      meta: {
        done: false
      }
    });

    try {
      const login = await axios.post('/auth/login', {
        [`${emailOrPhone(loginValue)}`]: loginValue,
        password
      });
      const { data } = login;

      data.user.logs = data.user.logs.slice(0, 10);
      
      axios.defaults.headers.common['token'] = data.token;

      dispatch({
        type: LOGIN,
        payload: data,
        meta: {
          done: true
        }
      });

      let lehce, firstname = data.user.firstname;

      switch(data.user.city) {
        case 'Gəncə':
          lehce = `Salam ağali`;
        default:
          lehce = `Dostumuz ${data.user.firstname},`;
      }

      global.alertDown.alertWithType('success', lehce, 'Xoş gəldin buralara!');

      await clearCache(CACHED_USER);
      await addStorage(CACHED_USER, data, config.CacheTime.auth);

      if (data.token) {
        dispatch({
          type: REDIRECT_TO,
          pathto: 'Main'
        });
      }

      if(data.user.autoId) {
        dispatch(getAutoById(data.user.autoId));
      }
    } catch (error) {
      const { user: { locale } } = getState();
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        let alertMsg;

        switch(message){
          case 'wrong_email_password':
            alertMsg = 'Email/Telefon və ya şifrən düzgün deyil'
        }
        global.alertDown.alertWithType('error', 'Xəta', alertMsg);

        return dispatch({
          type: LOGIN,
          meta: {
            done: true,
            error: `${message} ${localize[locale].wrong_email_password}`
          }
        });
      }

      dispatch({
        type: LOGIN,
        meta: {
          done: true,
          error: error.response.data || error.message
        }
      });
    }
  };
}

type SignUpCreds = {
  loginValue: string,
  fullname: string,
  password: string
};

export const SIGN_UP = 'SIGN_UP';
export function signup({ loginValue, password, fullname }: SignUpCreds) {
  return async (dispatch: Dispatch, getState: Function) => {
    const [firstname, lastname] = fullname.split(' ');

    dispatch({
      type: SIGN_UP,
      meta: {
        done: false
      }
    });

    try {
      const signupResponse = await axios.post('/auth/sign-up', {
        [`${emailOrPhone(loginValue)}`]: loginValue,
        firstname,
        lastname,
        password
      });
      const { data } = signupResponse;

      axios.defaults.headers.common['token'] = data.token;

      await clearCache(CACHED_USER);
      await addStorage(CACHED_USER, data, config.CacheTime.auth);

      dispatch({
        type: SIGN_UP,
        payload: data,
        meta: {
          done: true
        }
      });

      dispatch({
        type: REDIRECT_TO,
        pathto: 'Welcome'
      });
    } catch (error) {
      const { user: { locale } } = getState();

      if (error.response && error.response.data) {
        const { message } = error.response.data;
        global.alertDown.alertWithType('error', 'Xəta', `${message} ${localize[locale].alreadyExist}`);
        return dispatch({
          type: SIGN_UP,
          meta: {
            done: true,
            error: `${message} ${localize[locale].alreadyExist}`
          }
        });
      }
      dispatch({
        type: SIGN_UP,
        meta: {
          done: true,
          error: error.message
        }
      });
    }
  };
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  return async (dispatch: Dispatch) => {
    await clearCache(CACHED_USER);
    await clearCache(CACHED_AUTO);
    dispatch({
      type: LOGOUT,
      meta: {
        done: false
      }
    });

    return dispatch({
      type: REDIRECT_TO,
      pathto: 'Login'
    });
  };
};

type FacebookCreds = {
  email: string,
  firstname: string,
  lastname: string,
  userId: number,
  token: string,
}

export const extSignup = async (dispatch: Dispatch, getState: Function, params: Object) => {
  axios.post('/auth/facebook/sign-up', params)
  .then(async ({ data }) => {
    await clearCache(CACHED_USER);
    await addStorage(CACHED_USER, data, config.CacheTime.auth);

    dispatch({
      type: SIGN_UP,
      payload: data,
      meta: {
        done: true
      }
    });

    dispatch({
      type: REDIRECT_TO,
      pathto: 'Welcome'
    });
  })
}

export const facebookSignup = () => {
  return (dispatch: Dispatch, getState: () => void) => {
    FBLoginManager.loginWithPermissions(
      ['email', 'user_friends'],
      (error, fbData) => {
        if (!error) {
          const { credentials: { token, userId } } = fbData;
          const {
            first_name: firstname,
            last_name: lastname,
            email,
            picture: {
              data: {
                url
              }
            }
          } = JSON.parse(fbData.profile);
          console.log(fbData.profile);

          dispatch({
            type: SIGN_UP,
            meta: {
              done: false
            }
          });
          
          extSignup(dispatch, getState, { email, firstname, lastname, facebookId: userId, facebookToken: token });
        } else {
          console.log('Error: ', error);
        }
      }
    );
  };
};

export async function facebookStartLogin(dispatch: Dispatch, getState: Function, { email, firstname, lastname, userId, token}: FacebookCreds) {
    dispatch({
      type: LOGIN,
      meta: {
        done: false
      }
    });

    try {
      const login = await axios.post('/auth/facebook/login', {
        facebookId: userId,
        facebookToken: token
      });
      const { data } = login;

      dispatch({
        type: LOGIN,
        payload: data,
        meta: {
          done: true
        }
      });

      global.alertDown.alertWithType('success', `Dostumuz ${data.user.firstname},`, 'Xoş gəldin buralara!');

      await clearCache(CACHED_USER);
      await addStorage(CACHED_USER, data, config.CacheTime.auth);
      axios.defaults.headers.common['token'] = data.token;

      if (data.token) {
        dispatch({
          type: REDIRECT_TO,
          pathto: 'Main'
        });
      }

      if(data.user.autoId) {
        dispatch(getAutoById(data.user.autoId));
      }
    } catch (error) {
      extSignup(dispatch, getState, { email, firstname, lastname: Array.isArray(lastname) ? lastname.join(' ') : lastname, facebookId: userId, facebookToken: token });
    }
}

export function facebookLogin() {
  return async (dispatch: Dispatch, getState: Function) => {
    FBLoginManager.loginWithPermissions(
      ['email', 'user_friends'],
      async (error, fbData) => {
        const { credentials: { token, userId } } = fbData;

        if(Platform.OS === 'ios') {
            const checkFbAccess = await axios.get(`https://graph.facebook.com/v2.3/${userId}?fields=name,email&access_token=${token}`);
            const {
              name,
              email
            } = checkFbAccess.data;
            const [firstname, lastname] = name.split(' ');

            await facebookStartLogin(dispatch, getState, { email, firstname, lastname, userId, token });
        } else {
          const {
            first_name: firstname,
            last_name: lastname,
            email,
            picture: {
              data: {
                url
              }
            }
          } = JSON.parse(fbData.profile);

          await facebookStartLogin(dispatch, getState, { email, firstname, lastname, userId, token });
        }
      }
    );
  };
}


export const UPDATE_USER = 'UPDATE_USER';
export function updateUser(newChanges) {
  return async (dispatch: Dispatch, getState: Function) => {
    const { user } = getState();
    const data = { ...user, ...newChanges };

    if(newChanges.picture === 'default.png' || newChanges.autoPhoto === 'default.png') {
      // global.alertIcon = 'https://www.elastic.co/assets/blt4f19d57e5a0240a1/logo-elastic-cluster.png';
      // global.alertBackground = 'https://www.elastic.co/assets/blt4f19d57e5a0240a1/logo-elastic-cluster.png';
      global.alertDown.alertWithType('success', 'Şəkili silindiz', '');
    } else if (newChanges.picture) {
      global.alertDown.alertWithType('success', 'Şəkiliniz yükləndi', '');
    } else if (newChanges.autoPhoto) {
      global.alertDown.alertWithType('success', 'Avtonuzun şəkili yükləndi', '');
    } 
    

    dispatch({
      type: UPDATE_USER,
      payload: data
    });

    await clearCache(CACHED_USER);
    await addStorage(CACHED_USER, { user:data, token: user.token}, config.CacheTime.auth);
  }   
}