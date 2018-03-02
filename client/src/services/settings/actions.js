import {
  LOAD_DATA,
  DATA_LOADED,
  SAVE_DATA,
  SAVE_IN_DB,
  SAVED_IN_DB,
  ENABLE_CSRF,
  DISABLE_CSRF,
} from './actionTypes';

export const loadData = data => ({
  type: LOAD_DATA,
  payload: data,
});

export const dataLoaded = data => ({
  type: DATA_LOADED,
  payload: data,
});

export const saveData = data => ({
  type: SAVE_DATA,
  payload: data,
});

export const saveInDB = data => ({
  type: SAVE_IN_DB,
  payload: data,
});

export const savedInDB = () => ({
  type: SAVED_IN_DB,
});

export const enableCSRF = data => ({
  type: ENABLE_CSRF,
  payload: data,
});

export const disableCSRF = () => ({
  type: DISABLE_CSRF,
});
