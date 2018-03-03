// our packages
import {getLogger} from '../../util/logger';
import {Settings} from '../db';

const logger = getLogger(__filename);

export default async (request, reply) => {
  try {
    // get user input
    const {ip, port, token, username} = request.body;
    console.log(ip);
    console.log(port);
    console.log(token);
    console.log(username);
    // make sure all the fields are not empty
    // reply.code(400).send({error: 'IP should be present!'});
    reply.send({message: 'received'});
  } catch (err) {
    logger.error(err);
    reply.send({error: err.message});
  }
};
