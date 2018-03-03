// npm packages
import {pick} from 'lodash';

// our packages
import {getLogger} from '../../util/logger';
import {Settings} from '../db';
import schema from './schema';

const logger = getLogger('Settings.create');

export default async (request, reply) => {
  try {
    // get user input
    const body = pick(request.body, schema.keys);

    // save settings
    const settings = new Settings({
      config: body,
    });
    await settings.save();

    // send created settings back
    reply.send(settings);
  } catch (err) {
    logger.error(err);
    reply.send({error: err.message});
  }
};
