// npm packages
import {pick, isEmpty} from 'lodash';

// our packages
import {getLogger} from '../../util/logger';
import {CsrfProtection} from '../db';
import schema from './schema';

const logger = getLogger('CsrfProtection.create');

export default async (request, reply) => {
  try {
    // get user input
    const body = pick(request.body, schema.keys);

    // delete previous csrf entry
    const prevEntry = await CsrfProtection.limit(1).execute();
    if (!isEmpty(prevEntry)) {
      await prevEntry[0].delete();
    }

    // save csrf Protection
    const csrfProtection = new CsrfProtection(body);
    await csrfProtection.save();

    // send updated settings back
    return reply.send({data: csrfProtection, success: true});
  } catch (err) {
    logger.error(err);
    reply.send({message: err.message, success: false});
  }
};
