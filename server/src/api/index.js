const builds = require('./builds');
const jobs = require('./jobs');
const queues = require('./queues');
const {JENKINS_API_URL, createJenkinsAPIUrl} = require('./config');
const crumbIssuer = require('./crumbIssuer');

module.exports = {
  builds,
  jobs,
  queues,
  HOST: JENKINS_API_URL,
  createJenkinsAPIUrl,
  crumbIssuer,
};
