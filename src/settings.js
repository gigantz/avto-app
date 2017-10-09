import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import { createLogger } from 'redux-logger';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  shouldHotReload: false
}) : compose;

export default function configureStore(initialState: any = undefined) {
  const logger = createLogger();
  const enhancer = composeEnhancers(
    applyMiddleware(thunk, logger)
  )
  return createStore(rootReducer, initialState, enhancer)
}