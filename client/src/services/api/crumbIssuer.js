// npm packages
const Promise = require('bluebird');
const request = require('request');

// our packages
const JENKINS_API_URL = require('./config');

const API = '/api/json';
const CRUMB_ISSUER = `/crumbIssuer${API}`;

const jenkinsCrumb = function() {
  /**
   * Builds the URL to Jenkins from formatstring pattern and params.
   *
   * @param {string} pattern - URL format string patern.
   * @param {string|number} arguments for the formatstring pattern.
   * @returns {string} url - the URL formated according to arguments.
   */
  function buildUrl() {
    return JENKINS_API_URL + CRUMB_ISSUER;
  }

  /**
   * Run the actual HTTP request.
   *
   * @param {function} callback - the callback function to be called when request is finished.
   */
  const doRequest = function(callback) {
    // Build the actual request options
    const requestOptions = {
      method: 'GET',
      url: buildUrl(),
      headers: [],
      followAllRedirects: true,
      form: null,
      body: null,
    };

    // Do the request
    request(requestOptions, (error, response, body) => {
      if (error) {
        callback(error, response);
        return;
      }

      const data = JSON.parse(body.toString());
      callback(null, data);
    });
  };

  return {
    crumbIssuer(callback) {
      doRequest(callback);
    },
  };
};

// Promisify Jenkins Crumb API
const jenkinsCrumbAsync = () => {
  const crumbIssuer = jenkinsCrumb();
  return Object.keys(crumbIssuer).reduce(
    (acc, key) =>
      Object.assign(acc, {
        [key]: Promise.promisify(crumbIssuer[key]),
      }),
    {}
  );
};

module.exports = jenkinsCrumbAsync();
