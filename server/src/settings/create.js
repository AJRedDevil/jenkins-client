// npm packages
import {pick, isEmpty} from 'lodash';

// our packages
import {getLogger} from '../../util/logger';
import {Settings} from '../db';
import schema from './schema';

const logger = getLogger('Settings.create');

export default async (request, reply) => {
  try {
    // get user input
    const body = pick(request.body, schema.keys);

    // delete previous entry
    const prevEntry = await Settings.limit(1).execute();
    if (!isEmpty(prevEntry)) {
      console.log(prevEntry);
      await prevEntry[0].delete();
    }

    // save settings
    const settings = new Settings(body);
    await settings.save();

    // send created settings back
    reply.send({success: true, data: settings});
  } catch (err) {
    logger.error(err);
    reply.send({message: err.message, success: false});
  }
};
