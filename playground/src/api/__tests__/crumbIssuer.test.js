const api = require('../index');

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

const params = {
  username: 'als',
  ip: '10.45.1.209:8080',
  token: 'ae31a8f4c9da3cc4acc39bf82e2fefc7',
};

const crumb = api.jenkinsCrumb.crumbIssuer(api.buildJenkinsAPIUrl(params));
print(crumb);
