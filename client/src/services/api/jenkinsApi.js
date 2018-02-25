const Promise = require('bluebird');
const jenkinsAPI = require('jenkins-api');

const jenkins = (() => {
  const username = process.env.JENKINS_USERNAME;
  const token = process.env.JENKINS_TOKEN;
  const jenkinSite = process.env.JENKINS_URL;
  const JENKINS_API_URL = `http://${username}:${token}@${jenkinSite}`;
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
