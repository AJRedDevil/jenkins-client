// our packages
import {thinky} from './thinky';

const crumb = thinky.createModel('Crumb', {
  crumb: thinky.type.string().required(),
  crumbRequestField: thinky.type.string().required(),
});

export default crumb;
