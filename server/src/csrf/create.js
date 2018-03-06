// npm packages
import {pick} from 'lodash';

// our packages
import {getLogger} from '../../util/logger';
import {Csrf, Crumb} from '../db';
import schema from './schema';
import {createJenkinsAPIUrl, crumbIssuer} from '../api';

const logger = getLogger('Csrf.create');

export default async (request, reply) => {
  try {
    // get user input
    const body = pick(request.body, schema.inputKeys);
    // create jenkins url
    const jenkinsURL = await createJenkinsAPIUrl(body);
    const data = await crumbIssuer(jenkinsURL);
    const cleansedData = await pick(data, schema.crumbKeys);

    // save crnmb
    const crumb = new Crumb(cleansedData);
    await crumb.save();

    // save csrf
    const csrf = Csrf({isEnabled: true});
    await csrf.save();

    // send updated settings back
    return reply.send({data: csrf, success: true});
  } catch (err) {
    logger.error(err);
    reply.send({message: err.message, success: false});
  }
};
