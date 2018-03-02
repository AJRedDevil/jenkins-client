// npm packages
import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {pick} from 'lodash';
import request from 'request';

// our packages
import {
  LOAD_DATA,
  ERROR_IN_LOADING_DATA,
  SAVE_IN_DB,
  ERROR_IN_SAVING_DATA,
  ENABLE_CSRF,
  DISABLE_CSRF,
} from './actionTypes';
import {dataLoaded, savedInDB, saveInDB} from './actions';
import db from '../../utils/db';
import api from '../api';

const loadSettingsEpic$ = action$ =>
  action$
    .ofType(LOAD_DATA)
    .switchMap(action => db.fetch(action.payload))
    .map(response => dataLoaded(response))
    .catch(error =>
      Observable.of({
        type: ERROR_IN_LOADING_DATA,
        payload: error,
        error: true,
      })
    );

const saveSettingsEpic$ = action$ =>
  action$
    .ofType(SAVE_IN_DB)
    .switchMap(action => db.save(action.payload.key, action.payload.value))
    .map(() => savedInDB())
    .catch(error =>
      Observable.of({
        type: ERROR_IN_SAVING_DATA,
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
      saveInDB({
        key: 'csrf',
        value: {
          data: pick(response, ['crumbRequestField', 'crumb']),
          active: true,
        },
      })
    )
    .catch(error =>
      Observable.of({
        type: ERROR_IN_SAVING_DATA,
        payload: error,
        error: true,
      })
    );

const disableCSRFEpic$ = action$ =>
  action$
    .ofType(DISABLE_CSRF)
    .do(() => console.log(DISABLE_CSRF))
    .map(() =>
      saveInDB({
        key: 'csrf',
        value: {
          data: {},
          active: false,
        },
      })
    )
    .catch(error =>
      Observable.of({
        type: ERROR_IN_SAVING_DATA,
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
