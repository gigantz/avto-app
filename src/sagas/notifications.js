import axios from 'axios';
import { isEqual } from 'lodash';
import { takeEvery, put, select } from 'redux-saga/effects';

function* getNotified(action) {
  const { user } = yield select();
  
  try {
    const data = call(axios.post, '/user/notifications');

    if(!isEqual(data), user.notifications) {
      put ({ type:'GET_NOTIFICATIONS', notifications: {} });
    }

    return false;
  } catch (error) {
    put ({ type:'GET_NOTIFICATIONS', notifications: [], error: error.message });
  }
}

export default getNotified;