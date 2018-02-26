// npm packages
import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';

// our packages
import {
  LOAD_DATA,
  ERROR_IN_LOADING_DATA,
  SAVE_IN_DB,
  ERROR_IN_SAVING_DATA,
} from './actionTypes';
import {dataLoaded, savedInDB} from './actions';
import db from '../../utils/db';

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

export default combineEpics(loadSettingsEpic$, saveSettingsEpic$);
