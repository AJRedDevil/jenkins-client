const builds = require('./builds');
const jobs = require('./jobs');
const queues = require('./queues');
const views = require('./views');

const api = {
  builds,
  jobs,
  queues,
  views,
};

module.exports = api;
