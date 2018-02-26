// npm packages
import {Observable} from 'rxjs';

// our packages
import {FETCH_DATA, ERROR_IN_DATA_FETCH} from './actionTypes';
import {loadingComplete, dataFetched} from './actions';

const fetchDataEpic$ = action$ =>
  action$
    .ofType(FETCH_DATA)
    .delay(2000)
    .flatMap(() =>
      Observable.concat(
        Observable.of(loadingComplete()),
        Observable.of(dataFetched([]))
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
