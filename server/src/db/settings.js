import {thinky} from './thinky';

const Settings = thinky.createModel('Settings', {
  ip: thinky.type.string().required(),
  port: thinky.type.number().required(),
  username: thinky.type.string().required(),
  token: thinky.type.string().required(),
});

export default Settings;
