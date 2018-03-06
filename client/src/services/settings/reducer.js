// npm packages
import {isNull, isEmpty, pick} from 'lodash';

// our packages
import {
  DATA_FETCHED,
  SAVE_DATA_IN_STATE,
  DATA_SAVED_IN_DB,
  DATA_UPDATED_IN_DB,
  CSRF_DATA_FETCHED,
  CSRF_ENABLED,
  CSRF_DISABLED,
} from './actionTypes';

const emptyTemplate = {
  ip: '',
  port: '',
  username: '',
  token: '',
};
const INITIAL_STATE = {
  config: {
    serverData: emptyTemplate,
    dataLoaded: false,
    formData: emptyTemplate,
    keys: Object.keys(emptyTemplate),
  },
  csrf: {
    isEnabled: false,
    id: '',
  },
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_FETCHED: {
      if (!(isNull(action.payload.data) || isEmpty(action.payload.data))) {
        return {
          ...state,
          config: {
            ...state.config,
            serverData: action.payload.data,
            dataLoaded: action.payload.success,
            formData: pick(action.payload.data, state.config.keys),
          },
        };
      }
      return state;
    }
    case SAVE_DATA_IN_STATE:
      return {
        ...state,
        config: {
          ...state.config,
          formData: {
            ...state.config.formData,
            [action.payload.key]: action.payload.value,
          },
        },
      };
    case DATA_SAVED_IN_DB:
    case DATA_UPDATED_IN_DB:
      return {
        ...state,
        config: {
          ...state.config,
          serverData: action.payload.data,
          dataLoaded: action.payload.success,
        },
      };
    case CSRF_DATA_FETCHED:
    case CSRF_ENABLED:
    case CSRF_DISABLED: {
      if (!(isNull(action.payload.data) || isEmpty(action.payload.data))) {
        return {
          ...state,
          csrf: {...state.csrf, ...action.payload.data},
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default settings;
