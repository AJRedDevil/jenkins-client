// require('dotenv').config();

// const JENKINS_API_URL = (() => {
//   const username = process.env.JENKINS_USERNAME;
//   const token = process.env.JENKINS_TOKEN;
//   const jenkinSite = process.env.JENKINS_URL;
//   return `http://${username}:${token}@${jenkinSite}`;
// })();

const buildJenkinsAPIUrl = ({username, token, ip}) =>
  `http://${username}:${token}@${ip}`;

module.exports = buildJenkinsAPIUrl;
