const api = require('../api');

async function routes(fastify) {
  fastify.get('/', async (request, reply) =>
    reply.send({SERVER: 'LP Jenkins'})
  );

  fastify.route({
    method: 'GET',
    url: '/crumb',
    schema: {},
    handler: async (request, reply) => {
      try {
        const data = await api.crumbIssuer();
        reply.send(data);
      } catch (err) {
        reply.send({error: err.message});
      }
    },
  });
}

module.exports = routes;
