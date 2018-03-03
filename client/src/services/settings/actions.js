import {
  FETCH_DATA,
  DATA_FETCHED,
  SAVE_DATA_IN_STATE,
  SAVE_DATA_IN_DB,
  DATA_SAVED_IN_DB,
  ENABLE_CSRF,
  DISABLE_CSRF,
} from './actionTypes';

export const fetchData = data => ({
  type: FETCH_DATA,
  payload: data,
});

export const dataFetched = data => ({
  type: DATA_FETCHED,
  payload: data,
});

export const saveDataInState = data => ({
  type: SAVE_DATA_IN_STATE,
  payload: data,
});

export const saveDataInDB = data => ({
  type: SAVE_DATA_IN_DB,
  payload: data,
});

export const dataSavedInDB = () => ({
  type: DATA_SAVED_IN_DB,
});

export const enableCSRF = data => ({
  type: ENABLE_CSRF,
  payload: data,
});

export const disableCSRF = () => ({
  type: DISABLE_CSRF,
});
