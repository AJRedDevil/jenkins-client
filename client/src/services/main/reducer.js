// npm packages
import uuidv4 from 'uuid/v4';

// our packages
import {
  DATA_FETCHED,
  TOGGLE_SIDEBAR,
  LOADING,
  LOADING_COMPLETE,
} from './actionTypes';

const schema = [
  {
    id: uuidv4(),
    category: 'Build',
    items: [
      {
        id: uuidv4(),
        text: 'Item 1',
        link: 'item1',
      },
    ],
  },
  {
    id: uuidv4(),
    category: 'Settings',
    items: [
      {
        id: uuidv4(),
        text: 'Token',
        link: 'token',
      },
    ],
  },
];

const INITIAL_STATE = {
  schema,
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
