import {
  DATA_FETCHED,
  TOGGLE_SIDEBAR,
  LOADING,
  LOADING_COMPLETE,
} from './actionTypes';

const INITIAL_STATE = {
  loading: null,
  showSideBar: false,
  data: [],
};

const main = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_FETCHED:
      return {...state, data: action.payload};
    case TOGGLE_SIDEBAR:
      return {...state, showSideBar: !state.showSideBar};
    case LOADING:
      return {...state, loading: true};
    case LOADING_COMPLETE:
      return {...state, loading: false};
    default:
      return state;
  }
};

export default main;
