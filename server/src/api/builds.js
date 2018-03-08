// builds.js
const jenkins = require('./jenkinsApi');

// Builds
const build = ({job, params = {}}) => jenkins.build(job, params);

const buildWithParams = ({job, params = {}}) =>
  jenkins.build_with_params(job, params);

const stopBuild = ({job, params = {}}) => jenkins.stop_build(job, params);

const consoleOutput = ({job, buildName, params = {}}) =>
  jenkins.console_output(job, buildName, params);

const buildInfo = ({job, buildName, params = {}}) =>
  jenkins.build_info(job, buildName, params);

const lastBuildInfo = ({job, params = {}}) =>
  jenkins.last_build_info(job, params);

const lastCompletedBuildInfo = ({job, params = {}}) =>
  jenkins.last_completed_build_info(job, params);

const allBuilds = ({job, params = {}}) => jenkins.all_builds(job, params);

const testResult = ({job, buildNumber, params = {}}) =>
  jenkins.test_result(job, buildNumber, params);

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
