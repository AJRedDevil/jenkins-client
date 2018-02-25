// jobs.js
const jenkins = require('./jenkinsApi');

// Jobs
const allJobs = (params = {}) => jenkins.all_jobs(params);

const jobInfo = (jenkinJob, params = {}) => jenkins.job_info(jenkinJob, params);

const lastSuccess = (jenkinJob, params = {}) =>
  jenkins.last_success(jenkinJob, params);

const lastResult = (jenkinJob, params = {}) =>
  jenkins.last_result(jenkinJob, params);

const Jobs = {
  allJobs,
  jobInfo,
  lastSuccess,
  lastResult,
};

module.exports = Jobs;
