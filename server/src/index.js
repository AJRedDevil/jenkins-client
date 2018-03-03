const fastify = require('fastify')();

fastify.get('/', async (request, reply) => {
  reply.type('application/json').code(200);
  return {hello: 'world'};
});

fastify.listen(3000, '127.0.0.1', function(err) {
  if (err) throw err;
  console.log(`server listening on ${fastify.server.address().port}`);
});
