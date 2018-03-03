// npm packages
import {isEmpty} from 'lodash';

// our packages
import {getLogger} from '../../util/logger';
import {Settings} from '../db';

const logger = getLogger('Settings.get');

export default async (request, reply) => {
  try {
    const settings = await Settings.limit(1).execute();
    const setting = isEmpty(settings) > 0 ? {} : settings[0];
    reply.send(setting);
  } catch (err) {
    logger.error(err);
    reply.send({error: err.message});
  }
};
