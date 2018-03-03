const getJenkinsAPIUrl = () => {
  const username = process.env.JENKINS_USERNAME;
  const token = process.env.JENKINS_TOKEN;
  const jenkinSite = process.env.JENKINS_URL;
  return `http://${username}:${token}@${jenkinSite}`;
};

module.exports = {getJenkinsAPIUrl};
