// our packages
import {thinky} from './thinky';

const csrf = thinky.createModel('Csrf', {
  isEnabled: thinky.type.boolean().required(),
});

export default csrf;
