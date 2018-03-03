// npm packages
import {isNull} from 'lodash';

// our packages
import {DATA_FETCHED, SAVE_DATA_IN_STATE, SAVE_DATA_IN_DB} from './actionTypes';

const emptyTemplate = {
  ip: '',
  port: '',
  username: '',
  token: '',
  isCSRFActive: false,
};
const INITIAL_STATE = {
  jenkinsInfo: emptyTemplate,
  dataLoaded: false,
  newState: emptyTemplate,
  keys: Object.keys(emptyTemplate),
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_FETCHED: {
      if (!isNull(action.payload)) {
        return {
          ...state,
          jenkinsInfo: action.payload,
          dataLoaded: true,
          newState: action.payload,
        };
      }
      return state;
    }
    case SAVE_DATA_IN_STATE:
      return {
        ...state,
        newState: {
          ...state.newState,
          [action.payload.key]: action.payload.value,
        },
      };
    case SAVE_DATA_IN_DB:
      return {...state, dataLoaded: true};
    default:
      return state;
  }
};

export default settings;
