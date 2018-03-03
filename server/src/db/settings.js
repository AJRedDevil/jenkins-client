import {thinky} from './thinky';

const Settings = thinky.createModel('Settings', {
  config: {
    ip: thinky.type.string().required(),
    port: thinky.type.number().required(),
    username: thinky.type.string().required(),
    token: thinky.type.string().required(),
    isCSRFActive: thinky.type.boolean(),
  },
  csrfProtection: {
    crumb: thinky.type.string().required(),
    crumbRequestField: thinky.type.string().required(),
  },
});

export default Settings;
