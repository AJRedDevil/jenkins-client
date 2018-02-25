const cb = (err, data) => {
  if (err) {
    console.error(err);
  }
  console.log(data);
};

module.exports = {cb};
