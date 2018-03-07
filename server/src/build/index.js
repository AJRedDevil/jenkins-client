// import schema from './schema';
import handler_get from './get';
import handler_create from './create';
import handler_create_pak from './createPak';

async function routes(app) {
  // Builds
  app.get('/:action', handler_get);
  app.post('/pak', handler_create_pak);
  app.post('/:action', handler_create);
}

module.exports = routes;
