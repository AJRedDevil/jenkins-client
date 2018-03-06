const getJenkinsAPIUrl = () => {
  const username = process.env.JENKINS_USERNAME;
  const token = process.env.JENKINS_TOKEN;
  const jenkinSite = process.env.JENKINS_URL;
  return `http://${username}:${token}@${jenkinSite}`;
};

const createJenkinsAPIUrl = ({username, token, ip, port}) =>
  `http://${username}:${token}@${ip}:${port}`;

module.exports = {getJenkinsAPIUrl, createJenkinsAPIUrl};
