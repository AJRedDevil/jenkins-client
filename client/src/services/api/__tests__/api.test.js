require('dotenv').config();

const api = require('../index');

const colors = ['red', 'blue', 'yellow'];

// api.jobs
//   .allJobs()
//   .then(jobs => {
//     jobs.forEach(async job => {
//       const {name, color} = job;
//       if (colors.indexOf(color) > -1) {
//         fullInfo = await api.jobs.jobInfo(name);
//         lastBuild = await api.builds.lastBuildInfo(name);
//         when = new Date(lastBuild['timestamp'] / 1000);
//       } else {
//         when = '(unknown)';
//       }
//       console.log(`{0:${when} {1:${color}} {${name}}}`);
//     });
//     return Promise.resolve();
//   })
//   .catch(error => console.error(error));

// api.views
//   .getAllViews()
//   .then(views => {
//     views.forEach(view => console.log(view));
//     return Promise.resolve();
//   })
//   .catch(error => console.error(error));

api.views
  .viewInfo('Trigger_Management_Console')
  .then(view => console.log(view))
  .catch(error => console.error(error));
