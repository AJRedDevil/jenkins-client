/* eslint no-console: 0 */

// node module
const {exec} = require('child_process');
const path = require('path');

// dir to store the data in
const dbPath = path.join(__dirname, '..', '..', 'db');

// docker run command
const cmd = `docker run -d -p 28015:28015 -p 8090:8080 -v ${dbPath}/db:/data --name lpjenkinsdb rethinkdb`;

// execute command
const start = exec(cmd);

// remember if docker is installing image
let dbImage = false;

// runs when command writes to stdout
start.stdout.on('data', data => {
  if (data) {
    console.log('Successfully created lpjenkinsdb\n');
  }
});

// runs when command
start.stderr.on('data', data => {
  if (data === "Unable to find image 'rethinkdb:latest' locally\n" || dbImage) {
    console.log(data);
    dbImage = true;
  } else {
    console.log('Error while creating lpjenkinsdb:', data);
  }
});
