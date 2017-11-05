import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
// import { createLogger } from 'redux-logger';
import { transitionTo } from 'middlewares';
import axios from 'axios';
import config from 'config';
import Reactotron from 'reactotron-react-native';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  shouldHotReload: false
}) : compose;

axios.defaults.baseURL = config.API;

export default function configureStore(initialState: any = undefined) {
  // const logger = createLogger();
  const enhancer = composeEnhancers(
    applyMiddleware(thunk, transitionTo)
  )
  return Reactotron.createStore(rootReducer, initialState, enhancer)
}