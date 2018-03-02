const jenkinsCrumb = require('../crumbIssuer');

// helper
const crumbHeader = payload => ({
  headers: {
    [payload.crumbRequestField]: payload.crumb,
  },
});

const print = promise =>
  promise
    .then(data => console.log(crumbHeader(data)))
    .catch(err => console.error(err));

const crumb = jenkinsCrumb.crumbIssuer();
print(crumb);
