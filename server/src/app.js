// npm packages
import fastify from 'fastify';
import cors from 'cors';

// our packages
import appRoutes from './routes';
import settingRoutes from './settings';
import csrfRoutes from './csrf';
import {getLogger} from '../util/logger';

// Instantiate fastify
const app = fastify();

// Register CORS
app.use(cors());

// Register route
app.register(appRoutes);
app.register(settingRoutes, {prefix: '/api/settings'});
app.register(csrfRoutes, {prefix: '/api/csrf'});

// logger
const logger = getLogger(__filename);

// Hook logger in every request
app.addHook('onRequest', (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Run the server!
const start = async () => {
  try {
    await app.listen(8000, '0.0.0.0', err => {
      if (err) {
        logger.error(err);
        app.log.error(err);
        process.exit(1);
      }
      logger.info('Server is hosted in port 3000.');
    });
  } catch (err) {
    logger.error(err);
    app.log.error(err);
    process.exit(1);
  }
};

export default {start};
