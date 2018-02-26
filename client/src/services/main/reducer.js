// npm packages

// our packages
import {
  DATA_FETCHED,
  TOGGLE_SIDEBAR,
  LOADING,
  LOADING_COMPLETE,
  DB_CONFIGURED,
} from './actionTypes';

const schema = [
  {
    id: 1,
    category: {
      text: 'Home',
      link: '/',
    },
  },
  {
    id: 2,
    category: 'Build',
    items: [
      {
        id: 1,
        text: 'Item 1',
        link: 'item1',
      },
    ],
  },
  {
    id: 3,
    category: {
      text: 'Settings',
      link: '/settings',
    },
  },
];

const INITIAL_STATE = {
  schema,
  configureDB: true,
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
    case DB_CONFIGURED:
      return {...state, configureDB: false};
    default:
      return state;
  }
};

export default main;
