// npm packages
require('dotenv').config();
const chalk = require('chalk');
const path = require('path');
const ProgressBar = require('progress');

// our packages
const Client = require('./lib/scp2').Client;

// Generate the download client
const getDownloadClient = () =>
  Promise.resolve(
    new Client({
      host: process.env.DOWNLOAD_HOST,
      username: process.env.DOWNLOAD_USERNAME,
      password: process.env.DOWNLOAD_PASSWORD,
    })
  );

// Display the download status
const displayDownloadBar = client => {
  let downloadBar;
  client.on('transfer', function(buf, downloaded, len) {
    if (!downloadBar) {
      downloadBar = new ProgressBar(
        `downloading [${chalk.magenta(':bar')}] :rate/bps ${chalk.green(
          ':percent'
        )} :etas :elapseds`,
        {
          complete: '=',
          incomplete: ' ',
          width: 20,
          total: len,
        }
      );
    }
    downloadBar.tick(buf.length);
  });
};

const download = ({src, dest, filename}) =>
  getDownloadClient()
    .then(client => {
      const srcFP = path.join(src, filename);
      const destFP = path.join(dest, filename);
      console.log(
        chalk.yellow(`downloading ${filename} from ${src} to ${dest}`)
      );
      return new Promise((resolve, reject) => {
        client.download(srcFP, destFP, err => {
          if (err) {
            return reject({success: false, message: err});
          }
          resolve({success: true, message: 'finito'});
        });
        displayDownloadBar(client);
      });
    })
    .catch(err => console.log(err));

module.exports = download;

// Testing
/*
if (process.env.NODE_ENV === 'development') {
  const config = {
    src: '',
    dest: '',
    filename: '',
  };
  download(config)
    .then(res => {
      if (res.success) {
        process.exit(0);
      }
      process.exit(1);
    })
    .catch(err => console.log(err));
}
*/