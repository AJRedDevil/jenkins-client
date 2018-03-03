async function routes(app) {
  app.get('/', async (request, reply) => reply.send({SERVER: 'LP Jenkins'}));
}

module.exports = routes;
