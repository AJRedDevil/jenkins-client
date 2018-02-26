// npm packages
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// our packages
import root from '../main/reducer';
import settings from '../settings/reducer';

const rootReducer = combineReducers({
  root,
  settings,
  router: routerReducer,
});

export default rootReducer;
