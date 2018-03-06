const {getJenkinsAPIUrl, createJenkinsAPIUrl} = require('./config');
const crumbIssuer = require('./crumbIssuer');

module.exports = {
  HOST: getJenkinsAPIUrl(),
  createJenkinsAPIUrl,
  crumbIssuer,
};
