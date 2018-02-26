// npm packages
import uuidv4 from 'uuid/v4';
import {Observable} from 'rxjs';
import {range} from 'lodash';

// our packages
import {FETCH_DATA, ERROR_IN_DATA_FETCH} from './actionTypes';
import {loadingComplete, dataFetched} from './actions';

const data = range(1, 4).map(i => ({
  id: uuidv4(),
  category: `Category ${i}`,
  items: range(1, 4).map(j => ({id: uuidv4(), value: `Item ${j}`})),
}));

const fetchDataEpic$ = action$ =>
  action$
    .ofType(FETCH_DATA)
    .delay(2000)
    .flatMap(() =>
      Observable.concat(
        Observable.of(loadingComplete()),
        Observable.of(dataFetched(data))
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
