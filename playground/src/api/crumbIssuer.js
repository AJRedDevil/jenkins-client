// npm packages
const Promise = require('bluebird');
const request = require('request');

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
  function buildUrl(host) {
    return host + CRUMB_ISSUER;
  }

  /**
   * Run the actual HTTP request.
   *
   * @param {function} callback - the callback function to be called when request is finished.
   */
  const doRequest = function(host, callback) {
    // Build the actual request options
    const requestOptions = {
      method: 'GET',
      url: buildUrl(host),
      headers: [],
      followAllRedirects: true,
      form: null,
      body: null,
    };

    console.log(requestOptions);
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
    crumbIssuer(host, callback) {
      doRequest(host, callback);
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
