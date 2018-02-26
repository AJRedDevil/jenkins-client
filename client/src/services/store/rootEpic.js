// npm packages
import {combineEpics} from 'redux-observable';

// our packages
import mainEpic from '../main/epic';

const rootEpic = combineEpics(mainEpic);

export default rootEpic;
