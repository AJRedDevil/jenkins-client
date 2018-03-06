// our packages
const api = require('../index');

// helper
const print = promise =>
  promise.then(data => console.log(data)).catch(err => console.error(err));

let JOB = '';
let VIEW = '';

// VIEW = 'Trigger_Management_Console';
// console.log('views', VIEW);
// print(api.views.viewInfo(VIEW));

JOB = 'create_pak';
// console.log('allBuilds', JOB);
// print(api.builds.allBuilds(JOB));

JOB = 'create_pak';
// console.log('last completed build info', JOB);
// print(api.builds.lastCompletedBuildInfo(JOB));

JOB = 'create_pak';
// console.log('last completed build info', JOB);
// print(api.builds.consoleOutput(JOB));

JOB = 'create_pak';
api.jobs.jobInfo(JOB);

// const params = {
//   x: 30,
//   y: 24,
// };

// api.builds
//   .buildWithParams(JOB, params)
//   .then(data => console.log(data))
//   .catch(err => console.error(err));
