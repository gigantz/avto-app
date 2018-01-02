import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import createReduxSaga from 'redux-saga';
import { transitionTo } from 'middlewares';
import axios from 'axios';
import config from 'config';
import rootSaga from './sagas';

const reduxSaga = createReduxSaga();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  shouldHotReload: false
}) : compose;

axios.defaults.baseURL = config.API;

export function configureStore(initialState: any = undefined) {
  const enhancer = composeEnhancers(
    applyMiddleware(reduxSaga, thunk, transitionTo)
  )
  return createStore(rootReducer, initialState, enhancer)
}

export default configureStore();

reduxSaga.run(rootSaga);