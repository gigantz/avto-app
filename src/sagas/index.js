import { takeEvery, put, select } from 'redux-saga/effects';

import getNotified from './notifications';

function* rootSaga() {
  yield takeEvery('NOTIFICATIONS', getNotified);
};

export default rootSaga;