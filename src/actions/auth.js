// @flow

import axios from 'axios';
import { REDIRECT_TO } from 'actions/ui';
import { addStorage, clearCache, CACHED_USER } from 'utils/memory';
import { rules, emailOrPhone } from 'utils/validation';
import localize from 'localize';
import { FBLoginManager } from 'react-native-facebook-login';
import config from 'config';
import Reactotron from 'reactotron-react-native';
import { Platform } from 'react-native';

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

      dispatch({
        type: LOGIN,
        payload: data,
        meta: {
          done: true
        }
      });

      await clearCache(CACHED_USER);
      await addStorage(CACHED_USER, data, config.CacheTime.auth);

      if (data.token) {
        dispatch({
          type: REDIRECT_TO,
          pathto: 'Main'
        });
      }
    } catch (error) {
      const { user: { locale } } = getState();

      if (error.response && error.response.data) {
        const { message } = error.response.data;
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

export const extSignup = async (dispatch, getState, params) => {
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
  .catch(error => {
    const { user: { locale } } = getState();

    if (error.response && error.response.data) {
      const { message } = error.response.data;
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
  });
}

export const facebookSignup = () => {
  return (dispatch: Dispatch, getState) => {
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
          
          // facebookId, email, firstname, lastname, picture, facebookToken
          extSignup(dispatch, getState, { email, firstname, lastname, facebookId: userId, facebookToken: token, picture: url });
        } else {
          console.log('Error: ', error);
        }
      }
    );
  };
};

export function facebookLogin() {
  return async (dispatch: Dispatch, getState: Function) => {
    FBLoginManager.loginWithPermissions(
      ['email', 'user_friends'],
      async (error, fbData) => {
        Reactotron.log(fbData);

        const { credentials: { token, userId } } = fbData;

        if(Platform.OS === 'ios') {
          try {
            const { data } = await axios.get(`https://graph.facebook.com/v2.3/${userId}?fields=name,email&access_token=${token}`);
            const {
              first_name: firstname,
              last_name: lastname,
              email,
              picture: {
                data: {
                  url
                }
              }
            } = data;
            Reactotron.log(data);
          } catch (error) {
            console.log('no access');
          }
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
        }

        if (!error) {
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

            await clearCache(CACHED_USER);
            await addStorage(CACHED_USER, data, config.CacheTime.auth);

            if (data.token) {
              return dispatch({
                type: REDIRECT_TO,
                pathto: 'Main'
              });
            }
          } catch (error) {
            extSignup(dispatch, getState, { email, firstname, lastname, facebookId: userId, facebookToken: token, picture: url });
            // if (error.response && error.response.data) {
            //   console.log(error);
            //   const { message } = error.response.data;
            //   return dispatch({
            //     type: LOGIN,
            //     meta: {
            //       done: true,
            //       error: `${message} ${localize[locale].wrong_email_password}`
            //     }
            //   });
            // }
            // dispatch({
            //   type: LOGIN,
            //   meta: {
            //     done: true,
            //     error: error.response.data || error.message
            //   }
            // });
          }
        }
      }
    );
  };
}
