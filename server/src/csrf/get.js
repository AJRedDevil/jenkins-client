// npm packages
import {isEmpty} from 'lodash';

// our packages
import {getLogger} from '../../util/logger';
import {Csrf} from '../db';

const logger = getLogger('Csrf.get');

export default async (request, reply) => {
  try {
    const allData = await Csrf.limit(1).execute();
    const csrf = isEmpty(allData) > 0 ? {} : allData[0];
    reply.send({data: csrf, success: true});
  } catch (err) {
    logger.error(err);
    reply.send({message: err.message, success: false});
  }
};
