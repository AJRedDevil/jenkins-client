const JENKINS_API_URL = (() => {
  const username = process.env.JENKINS_USERNAME;
  const token = process.env.JENKINS_TOKEN;
  const jenkinSite = process.env.JENKINS_URL;
  return `http://${username}:${token}@${jenkinSite}`;
})();

const createJenkinsAPIUrl = ({username, token, ip, port}) =>
  `http://${username}:${token}@${ip}:${port}`;

const HEADERS = (() => {
  const crumb = process.env.CRUMB;
  const crumbRequestField = process.env.CRUMB_REQUEST_FIELD;
  return {
    headers: {[crumbRequestField]: crumb},
  };
})();

module.exports = {JENKINS_API_URL, createJenkinsAPIUrl, HEADERS};
