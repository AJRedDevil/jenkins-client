// load dot env
require('dotenv').config();
const {omit, isNull} = require('lodash');

// our packages
const api = require('./api');
const config = require('./config.json');

const print = promise =>
  promise.then(data => console.log(data)).catch(err => console.error(err));

/**
 * Build
 */

const waitForLastBuildInfo = async (job, queueId) => {
  let lastBuildInfo = {queueId: -1};
  while (queueId != lastBuildInfo.queueId) {
    lastBuildInfo = await api.builds.lastBuildInfo(job);
  }
  return lastBuildInfo;
};

const buildDockerImage = (job, params) =>
  api.builds.buildWithParams(job, params);

const getBuildNumero = async job => {
  let lastResult = null;
  let lastBuildId;
  while (isNull(lastResult)) {
    const allBuilds = await api.builds.allBuilds(job);
    lastResult = allBuilds[0].result;
    lastBuildId = allBuilds[0].id;
  }
  if (lastResult !== 'SUCCESS') {
    throw new Error(`${job} did not succeed`);
  }
  return lastBuildId;
};

const getDockerBuildNumero = async ({job, params}) => {
  let lastBuildInfo;
  if (params.createNew) {
    const newParams = omit(params, ['createNew']);
    const {queueId} = await buildDockerImage(job, newParams);
    lastBuildInfo = await waitForLastBuildInfo(job, queueId);
  } else {
    lastBuildInfo = await api.builds.lastCompletedBuildInfo(job);
  }
  if (lastBuildInfo.result === 'SUCCESS') {
    return getBuildNumero(params.job_to_build);
  } else {
    throw new Error(`${job} LastBuild failure`);
  }
};

const buildDC = async config => {
  const {job, params} = config;
  const [dcBack, dcFront] = params;
  // x: dcBack Build No.
  // y: dcFront Build No.
  const [x, y] = await Promise.all(
    getDockerBuildNumero(...dcBack),
    getDockerBuildNumero(...dcFront)
  );

  // Create Pak
  const pakParams = {x, y, createNew: true};
  buildDockerImage({job, params: pakParams})
    .then(queueId => waitForLastBuildInfo(job, queueId))
    .then(res => {
      console.log(res.artifacts[0].fileName);
      return Promise.resolve(res);
    })
    .catch(err => console.error(err));
};

// // { body: '',
// //   location: 'http://10.45.1.209:8080/queue/item/7315/',
// //   statusCode: 201,
// //   queueId: 7315 }

// const job = 'dcfront-1.3.0';
// const job = 'create_pak';
// print(api.builds.lastBuildInfo(job));
// print(api.builds.allBuilds(job));

print(buildDC(config));
