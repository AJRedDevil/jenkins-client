// queues.js
const jenkins = require('./jenkinsApi');

// Queues
const getAllQueues = (params = {}) => jenkins.queue(params);

const getOneQueuedItem = (queueItemNumber, params = {}) =>
  jenkins.queue_item(queueItemNumber, params);

const Views = {
  getAllQueues,
  getOneQueuedItem,
};

module.exports = Views;
