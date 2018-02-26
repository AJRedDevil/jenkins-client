import {
  FETCH_DATA,
  DATA_FETCHED,
  LOADING,
  LOADING_COMPLETE,
  TOGGLE_SIDEBAR,
  DB_CONFIGURED,
} from './actionTypes';

export const fetchData = () => ({
  type: FETCH_DATA,
});

export const dataFetched = data => ({
  type: DATA_FETCHED,
  payload: data,
});

export const setLoading = () => ({
  type: LOADING,
});

export const loadingComplete = () => ({
  type: LOADING_COMPLETE,
});

export const toggleSideBar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const dbConfigured = () => ({
  type: DB_CONFIGURED,
});
