const localforage = require('localforage');

const configure = () => {
  localforage.config({
    driver: [localforage.INDEXEDDB],
    name: 'jenkins-client',
    version: '1.0.0',
    description: 'Datastorage for jenkins client',
  });
};

// returns a promise to work on value once stored
const save = (key, value) => localforage.setItem(key, value);

// returns a promise
const fetch = key => localforage.getItem(key);

module.exports.db = {
  configure,
  save,
  fetch,
};
