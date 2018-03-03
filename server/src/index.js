require('dotenv').config();

// Require the framework and instantiate it
const fastify = require('fastify')();

// Register CORS
fastify.use(require('cors')());

// Register route
fastify.register(require('./routes'));

// logger
import {getLogger} from '../util/logger';
const logger = getLogger(__filename);
// Hook logger in every request
fastify.addHook('onRequest', (req, res, next) => {
  logger.info(req.url);
  next();
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0', err => {
      if (err) {
        logger.error(err);
        fastify.log.error(err);
        process.exit(1);
      }
      logger.info('Server is hosted in port 3000.');
    });
  } catch (err) {
    logger.error(err);
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
