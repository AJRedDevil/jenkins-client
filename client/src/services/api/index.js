const builds = require('./builds');
const jobs = require('./jobs');
const queues = require('./queues');
const views = require('./views');
const jenkinsCrumb = require('./crumbIssuer');
const buildJenkinsAPIUrl = require('./config');

const api = {
  builds,
  jobs,
  queues,
  views,
  jenkinsCrumb,
  buildJenkinsAPIUrl,
};

module.exports = api;
