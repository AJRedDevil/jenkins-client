// npm packages
const localforage = require('localforage');

const getStore = () =>
  localforage.createInstance({
    name: 'jenkins-client',
  });

const configure = () => {
  const store = getStore();
  store.config({
    name: 'jenkins-client',
    version: '1.0.0',
    description: 'Datastorage for jenkins client',
  });
};

// returns a promise to work on value once stored
const save = (key, value) => {
  const store = getStore();
  return store.setItem(key, value);
};

// returns a promise
const fetch = key => {
  const store = getStore();
  return store.getItem(key);
};

module.exports = {
  configure,
  save,
  fetch,
};
