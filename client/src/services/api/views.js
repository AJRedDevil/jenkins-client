// views.js
const jenkins = require('./jenkinsApi');

// Views
const getAllViews = (params = {}) => jenkins.all_views(params);

const createViews = (
  newViewName,
  viewMode = 'hudson.model.ListView',
  params = {}
) => jenkins.create_view(newViewName, viewMode, params);

const viewInfo = (viewName, params = {}) => jenkins.view_info(viewName, params);

const addJobToView = (viewInJenkins, jobInJenkins, params = {}) =>
  jenkins.add_job_to_view(viewInJenkins, jobInJenkins, params);

const Views = {
  createViews,
  getAllViews,
  viewInfo,
  addJobToView,
};

module.exports = Views;
