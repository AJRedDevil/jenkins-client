// npm packages
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// our packages
import root from '../main/reducer';

const rootReducer = combineReducers({
  root,
  router: routerReducer,
});

export default rootReducer;
