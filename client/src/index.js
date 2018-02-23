require('dotenv').config();

const api = require('./api');

api.jobs
  .allJobs()
  .then(data => {
    console.log(data);
    return data;
  })
  .catch(error => console.error(error));
