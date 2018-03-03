// system packages
import path from 'path';

const getScriptName = filename =>
  path.basename(filename, path.extname(filename));

module.exports = {
  getScriptName,
};
