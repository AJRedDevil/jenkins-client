// npm packages
import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {pick} from 'lodash';
import request from 'request';

// our packages
import {
  FETCH_DATA,
  ERROR_IN_FETCHING_DATA,
  SAVE_DATA_IN_DB,
  ERROR_SAVING_DATA_IN_DB,
  ENABLE_CSRF,
  DISABLE_CSRF,
} from './actionTypes';
import {dataFetched, dataSavedInDB, saveDataInDB} from './actions';
import db from '../../utils/db';
import api from '../api';

const loadSettingsEpic$ = action$ =>
  action$
    .ofType(FETCH_DATA)
    .switchMap(action => db.fetch(action.payload))
    .map(response => dataFetched(response))
    .catch(error =>
      Observable.of({
        type: ERROR_IN_FETCHING_DATA,
        payload: error,
        error: true,
      })
    );

const saveSettingsEpic$ = action$ =>
  action$
    .ofType(SAVE_DATA_IN_DB)
    .switchMap(action => db.save(action.payload.key, action.payload.value))
    .map(() => dataSavedInDB())
    .catch(error =>
      Observable.of({
        type: ERROR_SAVING_DATA_IN_DB,
        payload: error,
        error: true,
      })
    );

const enableCSRFEpic$ = action$ =>
  action$
    .ofType(ENABLE_CSRF)
    .do(() => console.log(ENABLE_CSRF))
    .map(action => api.buildJenkinsAPIUrl(action.payload))
    .do(host => console.log(host))
    .mergeMap(host =>
      request({
        method: 'GET',
        url: `${host}/crumbIssuer/api/json`,
        headers: {},
        followAllRedirects: true,
      })
    )
    .do(res => console.log('enb', res))
    .map(response =>
      saveDataInDB({
        key: 'csrf',
        value: {
          data: pick(response, ['crumbRequestField', 'crumb']),
          active: true,
        },
      })
    )
    .catch(error =>
      Observable.of({
        type: ERROR_SAVING_DATA_IN_DB,
        payload: error,
        error: true,
      })
    );

const disableCSRFEpic$ = action$ =>
  action$
    .ofType(DISABLE_CSRF)
    .do(() => console.log(DISABLE_CSRF))
    .map(() =>
      saveDataInDB({
        key: 'csrf',
        value: {
          data: {},
          active: false,
        },
      })
    )
    .catch(error =>
      Observable.of({
        type: ERROR_SAVING_DATA_IN_DB,
        payload: error,
        error: true,
      })
    );

export default combineEpics(
  loadSettingsEpic$,
  saveSettingsEpic$,
  enableCSRFEpic$,
  disableCSRFEpic$
);
