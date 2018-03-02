const Promise = require('bluebird');
const jenkinsAPI = require('jenkins-api');

const JENKINS_API_URL = require('./config');

const jenkins = (() => {
  return jenkinsAPI.init(JENKINS_API_URL);
})();

// Promisify Jenkins API
const jenkinsAsync = Object.keys(jenkins).reduce(
  (acc, key) =>
    Object.assign(acc, {
      [key]: Promise.promisify(jenkins[key]),
    }),
  {}
);

module.exports = jenkinsAsync;
