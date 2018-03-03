// our packages
import app from './app';
import {getLogger} from '../util/logger';
import {thinky} from './db';
const logger = getLogger(__filename);

// wait for DB to initialize
thinky.dbReady().then(() => {
  logger.info('Database ready, starting server...');
  app.start();
});

// output all uncaught expections
process.on('uncaughtException', err =>
  logger.error('uncaught exception:', err)
);
process.on('unhandledRejection', err =>
  logger.error('uncaught rejection:', err)
);
