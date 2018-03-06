// builds.js
const jenkins = require('./jenkinsApi');

// Builds
const build = (jenkinJob, params = {}) => jenkins.build(jenkinJob, params);

const buildWithParams = (jenkinJob, params = {}) =>
  jenkins.build_with_params(jenkinJob, params);

const stopBuild = (jenkinJob, params = {}) =>
  jenkins.stop_build(jenkinJob, params);

const consoleOutput = (jenkinJob, buildName, params = {}) =>
  jenkins.console_output(jenkinJob, buildName, params);

const buildInfo = (jenkinJob, buildName, params = {}) =>
  jenkins.build_info(jenkinJob, buildName, params);

const lastBuildInfo = (jenkinJob, params = {}) =>
  jenkins.last_build_info(jenkinJob, params);

const lastCompletedBuildInfo = (jenkinJob, params = {}) =>
  jenkins.last_completed_build_info(jenkinJob, params);

const allBuilds = (jenkinJob, params = {}) =>
  jenkins.all_builds(jenkinJob, params);

const testResult = (jenkinJob, buildNumber, params = {}) =>
  jenkins.test_result(jenkinJob, buildNumber, params);

const Builds = {
  build,
  buildWithParams,
  stopBuild,
  consoleOutput,
  buildInfo,
  lastBuildInfo,
  lastCompletedBuildInfo,
  allBuilds,
  testResult,
};

module.exports = Builds;
