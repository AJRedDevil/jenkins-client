import {
  FETCH_DATA,
  DATA_FETCHED,
  SAVE_DATA_IN_STATE,
  SAVE_DATA_IN_DB,
  DATA_SAVED_IN_DB,
  UPDATE_DATA_IN_DB,
  DATA_UPDATED_IN_DB,
  ENABLE_CSRF,
  DISABLE_CSRF,
  CSRF_ENABLED,
  CSRF_DISABLED,
  FETCH_CSRF_DATA,
  CSRF_DATA_FETCHED,
} from './actionTypes';

export const fetchData = () => ({
  type: FETCH_DATA,
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

export const dataSavedInDB = data => ({
  type: DATA_SAVED_IN_DB,
  payload: data,
});

export const updateDataInDB = data => ({
  type: UPDATE_DATA_IN_DB,
  payload: data,
});

export const dataUpdateddInDB = data => ({
  type: DATA_UPDATED_IN_DB,
  payload: data,
});

export const fetchCsrfData = () => ({
  type: FETCH_CSRF_DATA,
});

export const csrfDataFetched = data => ({
  type: CSRF_DATA_FETCHED,
  payload: data,
});

export const enableCSRF = data => ({
  type: ENABLE_CSRF,
  payload: data,
});

export const csrfEnabled = data => ({
  type: CSRF_ENABLED,
  payload: data,
});

export const disableCSRF = data => ({
  type: DISABLE_CSRF,
  payload: data,
});

export const csrfDisabled = data => ({
  type: CSRF_DISABLED,
  payload: data,
});
