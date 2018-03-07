// npm packages
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// our packages
import root from '../main/reducer';
import settings from '../settings/reducer';
import home from '../home/reducer';

const rootReducer = combineReducers({
  root,
  home,
  settings,
  router: routerReducer,
});

export default rootReducer;
