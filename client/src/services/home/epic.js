// npm packages
import {Observable} from 'rxjs';

// our packages
import {FETCH_DATA, ERROR_IN_DATA_FETCH} from './actionTypes';
import {loadingComplete, dataFetched} from './actions';
import config from '../../../config';

const API = (() => ({
  get(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => error);
  },
}))();

const fetchDataEpic$ = action$ =>
  action$
    .ofType(FETCH_DATA)
    .delay(2000)
    .switchMap(() =>
      API.get(`${config.HOST}/api/build/lastBuildInfo?job=create_pak`)
    )
    .flatMap(response =>
      Observable.concat(
        Observable.of(loadingComplete()),
        Observable.of(dataFetched(response))
      )
    )
    .catch(error =>
      Observable.of({
        type: ERROR_IN_DATA_FETCH,
        payload: error,
        error: true,
      })
    );

export default fetchDataEpic$;
