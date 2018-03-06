// our packages
const api = require('../index');

const colors = ['red', 'blue', 'yellow'];

// Jobs
api.jobs
  .allJobs()
  .then(jobs => {
    jobs.forEach(async job => {
      const {name, color} = job;
      let when;
      let lastSuccess;
      let lastResult;
      if (colors.indexOf(color) > -1) {
        // const fullInfo = await api.jobs.jobInfo(name);
        lastSuccess = await api.jobs.lastSuccess(name);
        lastResult = await api.jobs.lastResult(name);
        const lastBuild = await api.builds.lastBuildInfo(name);
        when = new Date(lastBuild.timestamp / 1000);
      } else {
        when = '(unknown)';
      }
      console.log(
        `{0:${when} {1:${color}} {2:${name}}} {3:${lastSuccess}} {4:${lastResult}}`
      );
    });
    return null;
  })
  .catch(error => console.error(error));

// Views
api.views
  .getAllViews()
  .then(views => views.forEach(view => console.log(view)))
  .catch(error => console.error(error));

api.views
  .viewInfo('Trigger_Management_Console')
  .then(view => console.log(view))
  .catch(error => console.error(error));
