// npm packages
require('dotenv').config();
import fastify from 'fastify';
import cors from 'cors';

// our packages
import setupRoutes from './routes';
import {getLogger} from '../util/logger';

// Instantiate fastify
const app = fastify();

// Register CORS
app.use(cors());

// Register route
app.register(setupRoutes);

// logger
const logger = getLogger(__filename);

// Hook logger in every request
app.addHook('onRequest', (req, res, next) => {
  logger.info(req.url);
  next();
});

// Run the server!
const start = async () => {
  try {
    await app.listen(3000, '0.0.0.0', err => {
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
