// npm packages
import {isNull} from 'lodash';

// our packages
import {DATA_LOADED, SAVE_DATA, SAVED_IN_DB} from './actionTypes';

const emptyTemplate = {
  ip: '',
  username: '',
  token: '',
};
const INITIAL_STATE = {
  jenkinsInfo: emptyTemplate,
  dataLoaded: false,
  newState: emptyTemplate,
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_LOADED: {
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
    case SAVE_DATA:
      return {
        ...state,
        newState: {
          ...state.newState,
          [action.payload.key]: action.payload.value,
        },
      };
    case SAVED_IN_DB:
      return {...state, dataLoaded: true};
    default:
      return state;
  }
};

export default settings;
