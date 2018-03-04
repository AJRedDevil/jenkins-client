// our packages
import {getLogger} from '../../util/logger';
import {CsrfProtection} from '../db';

const logger = getLogger('CsrfProtection.create');

export default async (request, reply) => {
  try {
    // delete previous csrf entry
    await CsrfProtection.deleteAll();

    return reply.send({message: 'Deleted', success: true});
  } catch (err) {
    logger.error(err);
    reply.send({message: err.message, success: false});
  }
};
