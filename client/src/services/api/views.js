// views.js
const jenkins = require('./jenkinsApi');

// Views
const getAllViews = (params = {}) => jenkins.all_views(params);

const viewInfo = (viewName, params = {}) => jenkins.view_info(viewName, params);

const Views = {
  getAllViews,
  viewInfo,
};

module.exports = Views;
