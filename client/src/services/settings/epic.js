// npm packages
import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';

// our packages
import {
  FETCH_DATA,
  ERROR_IN_FETCHING_DATA,
  SAVE_DATA_IN_DB,
  ERROR_SAVING_DATA_IN_DB,
  UPDATE_DATA_IN_DB,
  ERROR_UPDATING_DATA_IN_DB,
  ENABLE_CSRF,
  ERROR_IN_ENABLING_CSRF,
  DISABLE_CSRF,
  ERROR_IN_DISABLING_CSRF,
  FETCH_CSRF_DATA,
} from './actionTypes';
import {
  dataFetched,
  dataSavedInDB,
  dataUpdateddInDB,
  csrfEnabled,
  csrfDisabled,
  fetchCsrfData,
  csrfDataFetched,
} from './actions';
import config from '../../../config';

const API = (() => ({
  get(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => error);
  },
  post(url, data) {
    return fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      redirect: 'follow',
      referrer: 'no-referrer',
      headers: {'content-type': 'application/json'},
    })
      .then(response => response.json())
      .catch(error => error);
  },
  delete(url) {
    return fetch(url, {
      method: 'DELETE',
      referrer: 'no-referrer',
    })
      .then(response => response.json())
      .catch(error => error);
  },
}))();

const epicError = (type, payload) =>
  Observable.of({
    type,
    payload,
    error: true,
  });

const loadSettingsEpic$ = action$ =>
  action$
    .ofType(FETCH_DATA)
    .switchMap(() => API.get(`${config.HOST}/api/settings`))
    .mergeMap(response =>
      Observable.concat(
        Observable.of(dataFetched(response)),
        Observable.concat(Observable.of(fetchCsrfData()))
      )
    )
    .catch(error => epicError(ERROR_IN_FETCHING_DATA, error));

const loadCsrfsEpic$ = action$ =>
  action$
    .ofType(FETCH_CSRF_DATA)
    .switchMap(() => API.get(`${config.HOST}/api/csrf`))
    .map(res => csrfDataFetched(res))
    .catch(error => epicError(ERROR_IN_FETCHING_DATA, error));

const saveSettingsEpic$ = action$ =>
  action$
    .ofType(SAVE_DATA_IN_DB)
    .switchMap(action =>
      API.post(`${config.HOST}/api/settings`, action.payload)
    )
    .map(res => dataSavedInDB(res))
    .catch(error => epicError(ERROR_SAVING_DATA_IN_DB, error));

const updateSettingsEpic$ = action$ =>
  action$
    .ofType(UPDATE_DATA_IN_DB)
    .switchMap(action =>
      API.post(
        `${config.HOST}/api/settings/${action.payload.id}`,
        action.payload.data
      )
    )
    .map(res => dataUpdateddInDB(res))
    .catch(error => epicError(ERROR_UPDATING_DATA_IN_DB, error));

const enableCSRFEpic$ = action$ =>
  action$
    .ofType(ENABLE_CSRF)
    .switchMap(action => API.post(`${config.HOST}/api/csrf`, action.payload))
    .map(res => csrfEnabled(res))
    .catch(error => epicError(ERROR_IN_ENABLING_CSRF, error));

const disableCSRFEpic$ = action$ =>
  action$
    .ofType(DISABLE_CSRF)
    .switchMap(action =>
      API.delete(`${config.HOST}/api/csrf/${action.payload.id}`)
    )
    .map(res => csrfDisabled(res))
    .catch(error => epicError(ERROR_IN_DISABLING_CSRF, error));

export default combineEpics(
  loadSettingsEpic$,
  loadCsrfsEpic$,
  saveSettingsEpic$,
  updateSettingsEpic$,
  enableCSRFEpic$,
  disableCSRFEpic$
);
