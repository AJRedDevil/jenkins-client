// npm packages
import {pick} from 'lodash';

// our packages
import {getLogger} from '../../util/logger';
import {Settings} from '../db';
import schema from './schema';

const logger = getLogger('Settings.update');

export default async (request, reply) => {
  try {
    const {id} = request.params;
    // get user input
    const body = pick(request.body, schema.keys);

    // get setting
    let settings = await Settings.get(id);

    // check if settings exists
    if (!settings) {
      return reply.code(400).send({error: 'Settings not found'});
    }

    // update settings
    settings = Object.assign(settings, body);

    // // save settings
    await settings.save();

    // send updated settings back
    return reply.send({success: true, data: settings});
  } catch (err) {
    logger.error(err);
    reply.send({message: err.message, success: false});
  }
};
