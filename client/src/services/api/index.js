const builds = require('./builds');
const jobs = require('./jobs');
const queues = require('./queues');
const views = require('./views');
const jenkinsCrumb = require('./crumbIssuer');

const api = {
  builds,
  jobs,
  queues,
  views,
  jenkinsCrumb,
};

module.exports = api;
