// // npm packages
import Joi from 'joi';

const keys = ['crumb', 'crumbRequestField'];

const body = {
  body: Joi.object()
    .keys({
      crumb: Joi.string().required(),
      crumbRequestField: Joi.string().required(),
    })
    .required(),
};

const createCsrfProtectionSchema = {
  schema: Object.assign({}, body),
  schemaCompiler: schema => data => Joi.validate(data, schema),
};

export default {
  keys,
  createCsrfProtectionSchema,
};
