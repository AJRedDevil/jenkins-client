// npm packages
import {combineEpics} from 'redux-observable';

// our packages
import mainEpic$ from '../main/epic';
import settingEpic$ from '../settings/epic';

const rootEpic = combineEpics(mainEpic$, settingEpic$);

export default rootEpic;
