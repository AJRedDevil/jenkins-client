// npm packages
const {flow} = require('lodash');

// our packages
const {getJSONOptions} = require('./RESTHelper');
const {getLogger} = require('./logger');
const {getScriptName} = require('./pathHelper');

module.exports = {
  getJSONOptions,
  getLogger: flow(getScriptName, getLogger),
};
