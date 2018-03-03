// our packages
import {getLogger} from '../../util/logger';
import {Settings} from '../db';

const logger = getLogger(__filename);

export default async (request, reply) => {
  try {
    const settings = await Settings.get();
    logger.info('settings', settings);
    reply.send(settings);
  } catch (err) {
    logger.error(err);
    reply.send({error: err.message});
  }
};
