// npm packages
const debug = require('debug');
const pretty = require('prettysize');
const prettySeconds = require('pretty-seconds');
const ProgressBar = require('progress');
const chalk = require('chalk');

// our packages
const Client = require('./scp2').Client;

const NAME = 'Test SCP Download';
const log = debug('scp:log');
const error = debug('scp:error');

log('booting %o', NAME);

// const downloadClient = new Client({
//   host: '',
//   username: '',
//   password: '',
// });
// const downloadSrc = '/logpoint/DownloadPak/Director_Console-1.3.0.20.pak';
// const downloadDest = 'Director_Console-1.3.0.20.pak';

// downloadClient.download(downloadSrc, downloadDest, function(err) {
//   error(err);
// });
// let downloadBar;
// downloadClient.on('transfer', function(buf, downloaded, len) {
//   if (!downloadBar) {
//     downloadBar = new ProgressBar(
//       `downloading [${chalk.magenta(':bar')}] :rate/bps ${chalk.green(
//         ':percent'
//       )} :etas :elapseds`,
//       {
//         complete: '=',
//         incomplete: ' ',
//         width: 20,
//         total: len,
//       }
//     );
//   }
//   downloadBar.tick(buf.length);
// });

const uploadClient = new Client({
  host: '',
  username: '',
  privateKey: require('fs').readFileSync('path'),
  passphrase: '',
});
const uploadSrc = 'Director_Console-1.3.0.20.pak';
const uploadDest = '/home/support';
uploadClient.upload(uploadSrc, uploadDest, function(err) {
  error(err);
});
let uploadBar;
uploadClient.on('transfer', function(buf, downloaded, len) {
  // console.log(buf);
  // console.log(downloaded);
  // console.log(pretty(buf.length));
  // console.log(len);
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
  uploadBar.tick(downloaded);
});
