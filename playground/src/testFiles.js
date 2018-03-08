const download = require('./download');
const upload = require('./upload');

const downloadConfig = {
  src: '/logpoint/DownloadPak',
  dest: '/Users/AJRedDevil/Desktop',
  filename: 'install.sh',
  // filename: 'Director_Console-1.3.0.21.pak',
};
const uploadConfig = {
  src: '/Users/AJRedDevil/Desktop',
  dest: '/home/support',
  filename: 'install.sh',
  // filename: 'Director_Console-1.3.0.18.pak',
};

const onSuccessUpload = () =>
  upload(uploadConfig)
    .then(res => {
      if (res.success) {
        process.exit(0);
      }
      process.exit(1);
    })
    .catch(err => console.log(err));

if (process.env.NODE_ENV === 'development') {
  download(downloadConfig)
    .then(res => (res.success ? onSuccessUpload() : process.exit(1)))
    .catch(err => console.log(err));
}
