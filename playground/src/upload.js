// npm packages
require('dotenv').config();
const chalk = require('chalk');
const path = require('path');
const ProgressBar = require('progress');

// our packages
const Client = require('./scp2').Client;

// Generate the upload client
const getUploadClient = () =>
  Promise.resolve(
    new Client({
      host: process.env.UPLOAD_HOST,
      username: process.env.UPLOAD_USERNAME,
      privateKey: require('fs').readFileSync(process.env.KEY_PATH),
      passphrase: process.env.PASSPHRASE,
    })
  );

// Display the upload status
const displayUploadBar = client => {
  let uploadBar;
  client.on('transfer', function(buf, uploaded, len) {
    if (!uploadBar) {
      uploadBar = new ProgressBar(
        `uploading [${chalk.magenta(':bar')}] :rate/bps ${chalk.green(
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
    uploadBar.tick(buf.length);
  });
};

const upload = ({src, dest, filename}) =>
  getUploadClient()
    .then(client => {
      const fp = path.join(src, filename);
      console.log(chalk.yellow(`uploading ${filename} from ${src} to ${dest}`));
      return new Promise((resolve, reject) => {
        client.upload(fp, dest, err => {
          if (err) {
            return reject({success: false, message: err});
          }
          resolve({success: true, message: 'finito'});
        });
        displayUploadBar(client);
      });
    })
    .catch(err => console.log(err));

module.exports = upload;

// Testing
/*
if (process.env.NODE_ENV === 'development') {
  const config = {
    src: '',
    dest: '',
    filename: '',
  };
  upload(config)
    .then(res => {
      if (res.success) {
        process.exit(0);
      }
      process.exit(1);
    })
    .catch(err => console.log(err));
}
*/