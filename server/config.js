exports.db = {
  host: process.env.LP_JENKINS_DB_URL || 'localhost',
  port: process.env.LP_JENKINS_DB_PORT || 28015,
  db: 'lpjenkinsdb',
};
