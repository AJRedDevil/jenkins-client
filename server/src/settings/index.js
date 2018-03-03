import schema from './schema';
import handler_get from './get';
import handler_create from './create';
import handle_update from './update';

async function routes(app) {
  // Settings
  app.get('/', handler_get);
  app.post('/', schema.createSettingsSchema, handler_create);
  app.post('/:id', schema.updateSettingsSchema, handle_update);
}

module.exports = routes;
