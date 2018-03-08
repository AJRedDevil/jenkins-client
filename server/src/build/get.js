// npm packages
import {isNull} from 'lodash';

// our packages
import api from '../api';
import {getLogger} from '../../util/logger';

const logger = getLogger('Build.get');

const verifyBuildRequest = action => !isNull(action) && action in api.builds;

export default async (request, reply) => {
  try {
    const {action} = request.params;
    if (verifyBuildRequest(action)) {
      const func = api.builds[action];
      const data = await func(request.query);
      return reply.send({data: data, success: true});
    } else {
      return reply.code(400).send({message: 'Bad Request', success: false});
    }
  } catch (err) {
    logger.error(err);
    return reply.send({message: err.message, success: false});
  }
};
