const getApplyJSONOptions = uri => ({
  uri,
  json: true,
});

const getJSONOptions = uri =>
  Array.isArray(uri) ? uri.map(getApplyJSONOptions) : getApplyJSONOptions(uri);

module.exports = {
  getJSONOptions,
};
