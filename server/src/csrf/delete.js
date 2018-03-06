// npm packages
import {isEmpty} from 'lodash';

// our packages
import {getLogger} from '../../util/logger';
import {Csrf, Crumb} from '../db';

const logger = getLogger('Csrf.create');

export default async (request, reply) => {
  try {
    const {id} = request.params;

    await Csrf.get(id).then(async csrf => {
      const allData = await Crumb.limit(1).execute();
      if (!isEmpty(allData)) {
        const crumb = await Crumb.get(allData[0].id);
        await csrf.delete();
        await crumb.delete();
      }
    });

    return reply.send({data: {isEnabled: false, id: ''}, success: true});
  } catch (err) {
    logger.error(err);
    reply.send({message: err.message, success: false});
  }
};
