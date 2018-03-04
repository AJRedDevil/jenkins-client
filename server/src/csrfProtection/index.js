import schema from './schema';
import handler_get from './get';
import handler_create from './create';
import handler_delete from './delete';

async function routes(app) {
  // Settings
  app.get('/', handler_get);
  app.post('/', schema.createCsrfProtectionSchema, handler_create);
  app.delete('/', handler_delete);
}

module.exports = routes;
