const builds = require('./builds');
const jobs = require('./jobs');
const queues = require('./queues');
const views = require('./views');
const jenkinsCrumb = require('./crumbIssuer');
const {JENKINS_API_URL, HEADERS} = require('./config');

const api = {
  builds,
  jobs,
  queues,
  views,
  jenkinsCrumb,
  JENKINS_API_URL,
  HEADERS,
};

module.exports = api;
