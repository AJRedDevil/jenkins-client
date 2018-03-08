const download = require('./download');
const upload = require('./upload');

const downloadConfig = {
  src: '/logpoint/DownloadPak',
  dest: '/Users/AJRedDevil/Desktop',
  filename: 'Director_Console-1.3.0.22.pak',
};
const uploadConfig = {
  src: '/Users/AJRedDevil/Desktop',
  dest: '/home/support',
  filename: 'Director_Console-1.3.0.22.pak',
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
