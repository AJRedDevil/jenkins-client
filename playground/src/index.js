// load dot env
require('dotenv').config();
const debug = require('debug');

// our packages
const api = require('./api');

const NAME = 'Test Jenkins API';
const log = debug('api:log');
const error = debug('api:error');

log('booting %o', NAME);
error('booting %o', NAME);

const print = promise =>
  promise.then(data => log(data)).catch(err => error(err));

let job;
let params;

// // DB Backend
// job = 'Analyza_And_Trigger_ManagementConsole_Backend';
// params = {
//   useGeneric: 'True',
//   genericBranch: 'feature/DC_1.3.0',
//   management_console_backend: 'feature/DC_1.3.0',
//   job_to_build: 'dcback-1.3.0',
// };
// const dcBackendBuild = api.builds.buildWithParams(job, params);
// print(dcBackendBuild);

// const lastBuildInfo = api.builds.lastBuildInfo(job);
// print(lastBuildInfo);

// // DC Frontend
// job = 'Analyze_And_Trigger_ManagementConsole_Webapp';
// params = {
//   useGeneric: 'True',
//   genericBranch: 'feature/DC_1.3.0',
//   management_console_backend: 'feature/DC_1.3.0',
//   job_to_build: 'dcfront-1.3.0',
// };
// const dcFrontendBuild = api.builds.buildWithParams(job, params);
// print(dcFrontendBuild);

// create pak
// job = 'create_pak';
// params = {
//   x: 34,
//   y: 27,
// };
// const createPakBuild = api.builds.buildWithParams(job, params);
// print(createPakBuild);

// const lastBuildInfo = api.builds.lastBuildInfo(job);
// print(lastBuildInfo);

// const buildName = '33';
// const consoleOutput = api.builds.consoleOutput(job, buildName);
// print(consoleOutput);
