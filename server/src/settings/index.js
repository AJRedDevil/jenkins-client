import handler_get from './get';
import handler_post from './create';

async function routes(app) {
  // Settings
  app.get('/', handler_get);
  app.post('/', handler_post);
}

module.exports = routes;
