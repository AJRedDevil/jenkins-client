// npm packages
const rp = require('request-promise');

// our packages
const {getJenkinsAPIUrl} = require('./config');

const API = '/api/json';
const CRUMB_ISSUER = `/crumbIssuer${API}`;

/**
 * Builds the URL to Jenkins strictly.
 *
 * @returns {string} url - the formatted URL.
 */
function buildUrl(jenkinsUrl) {
  const host = jenkinsUrl || getJenkinsAPIUrl();
  return host + CRUMB_ISSUER;
}

/**
 * Run the actual HTTP request.
 *
 */
const jenkinsCrumbRequest = function(jenkinsUrl) {
  const requestOptions = {
    uri: buildUrl(jenkinsUrl),
    json: true,
  };

  // Do the request
  return rp(requestOptions)
    .then(res => res)
    .catch(error => error);
};

module.exports = jenkinsCrumbRequest;
