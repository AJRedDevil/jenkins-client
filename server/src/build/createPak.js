// npm packages
import {isNull} from 'lodash';

// our packages
import api from '../api';
import {getLogger} from '../../util/logger';

const logger = getLogger('Build.post');

const dockerBuild = props => {
  return Promise.resolve(props);
  // return api.builds.buildWithParams(props);
};

export default async (request, reply) => {
  try {
    const {job, params} = request.body;
    logger.info(job);
    const queues = await Promise.all(params.map(props => dockerBuild(props)));
    queues.map(value => console.log(value));

    return reply.send({data: {}, success: true});
  } catch (err) {
    logger.error(err);
    return reply.send({message: err.message, success: false});
  }
};
