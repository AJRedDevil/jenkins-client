// our packages
import {thinky} from './thinky';

const csrfProtection = thinky.createModel('CsrfProtection', {
  crumb: thinky.type.string().required(),
  crumbRequestField: thinky.type.string().required(),
});

export default csrfProtection;
