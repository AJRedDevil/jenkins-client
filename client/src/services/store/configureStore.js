// npm packages
import {applyMiddleware, createStore, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {routerMiddleware} from 'react-router-redux';

// our packages
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore(history) {
  const middlewares = applyMiddleware(
    routerMiddleware(history),
    epicMiddleware
  );
  const store = createStore(rootReducer, composeEnhancers(middlewares));
  return store;
}
