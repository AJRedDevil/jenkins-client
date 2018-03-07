// npm packages

// our packages
import {DATA_FETCHED, LOADING, LOADING_COMPLETE} from './actionTypes';

const INITIAL_STATE = {
  loading: null,
  data: {},
};

const main = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_FETCHED:
      return {...state, data: action.payload.data};
    case LOADING:
      return {...state, loading: true};
    case LOADING_COMPLETE:
      return {...state, loading: false};
    default:
      return state;
  }
};

export default main;
