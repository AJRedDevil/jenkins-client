// load dot env
require('dotenv').config();
const debug = require('debug')('api');

// our packages
const api = require('./api');

const NAME = 'Test Jenkins API';

debug('booting %o', NAME);
