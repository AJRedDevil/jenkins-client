// npm packages
import {combineEpics} from 'redux-observable';

// our packages
import mainEpic$ from '../main/epic';
import settingEpic$ from '../settings/epic';
import homeEpic$ from '../home/epic';

const rootEpic = combineEpics(mainEpic$, homeEpic$, settingEpic$);

export default rootEpic;
