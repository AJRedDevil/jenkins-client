import schema from './schema';
import handler_get from './get';
import handler_create from './create';
import handler_delete from './delete';

async function routes(app) {
  // Settings
  app.get('/', handler_get);
  app.post('/', schema.createCsrfSchema, handler_create);
  app.delete('/:id', schema.deleteCsrfSchema, handler_delete);
}

module.exports = routes;
