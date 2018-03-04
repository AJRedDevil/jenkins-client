// npm packages
import {isEmpty} from 'lodash';

// our packages
import {getLogger} from '../../util/logger';
import {CsrfProtection} from '../db';

const logger = getLogger('Settings.get');

export default async (request, reply) => {
  try {
    const allData = await CsrfProtection.limit(1).execute();
    const csrfProtection = isEmpty(allData) > 0 ? {} : allData[0];
    reply.send({data: csrfProtection, success: true});
  } catch (err) {
    logger.error(err);
    reply.send({message: err.message, success: false});
  }
};
