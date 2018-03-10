// load dot env
require('dotenv').config();
const Promise = require('bluebird');
const {isNull} = require('lodash');

// our packages
const api = require('./api');
const config = require('./config.json');
const {printInfo, printError, printSuccess} = require('./util');

const triggerBuild = (job, params) => api.builds.buildWithParams(job, params);
const waitForBuildToComplete = async (job, nextBuildNumber) => {
  while (true) {
    setTimeout(
      () =>
        printInfo(`Waiting for ${job}-${nextBuildNumber} job to complete...`),
      2000
    );
    const allBuilds = await api.builds.allBuilds(job);
    const lastResult = allBuilds[0].result;
    const lastBuildId = parseInt(allBuilds[0].id, 10);
    if (!isNull(lastResult) && lastBuildId === nextBuildNumber) {
      return job;
    }
  }
};
const printLastBuildStatus = (job, buildInfo) => {
  if (buildInfo.result !== 'SUCCESS') {
    printError(`${job} Build failure`);
    throw new Error(`${job} LastBuild failure`);
  } else {
    printSuccess(`${job} Build success`);
    return Promise.resolve(buildInfo);
  }
};
const getDCBuildInfo = async ({job, params, createNew}) => {
  const {job_to_build} = params;
  if (createNew) {
    const jobInfo = await api.jobs.jobInfo(job_to_build);
    printInfo(`${job_to_build} next build num: ${jobInfo.nextBuildNumber}`);
    printInfo(`Triggering build for ${job_to_build}`);
    return triggerBuild(job, params)
      .then(() => waitForBuildToComplete(job_to_build, jobInfo.nextBuildNumber))
      .then(() => api.builds.lastBuildInfo(job_to_build))
      .then(buildInfo => printLastBuildStatus(job_to_build, buildInfo))
      .catch(err => printError(err));
  } else {
    printInfo(`${job_to_build} last successfuly build chosen`);
    return api.builds.lastCompletedBuildInfo(job_to_build);
  }
};

const buildDC = config => {
  const {job, params} = config;
  const [dcBackParams, dcFrontParams] = params;
  // Trigger Front and Back build as necessary or return previous complete build info
  return Promise.all([
    getDCBuildInfo(dcBackParams),
    getDCBuildInfo(dcFrontParams),
  ])
    .then(async ([dcBackBuildInfo, dcFrontBuildInfo]) => {
      // Create Pak
      printInfo(
        `Creating DC Pak: dc-back: #${dcBackBuildInfo.number}, dc-front: #${
          dcFrontBuildInfo.number
        }`
      );
      const pakParams = {
        x: dcBackBuildInfo.number,
        y: dcFrontBuildInfo.number,
      };
      const jobInfo = await api.jobs.jobInfo(job);
      return triggerBuild(job, pakParams)
        .then(() => waitForBuildToComplete(job, jobInfo.nextBuildNumber))
        .then(() => api.builds.lastBuildInfo(job))
        .then(buildInfo => printLastBuildStatus(job, buildInfo))
        .catch(err => printError(err));
    })
    .catch(err => printError(err));
};

// Testing
const print = promise =>
  promise.then(data => printInfo(data)).catch(err => printError(err));
print(buildDC(config));
