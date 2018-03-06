// // npm packages
import Joi from 'joi';

const inputKeys = ['ip', 'port', 'token', 'username'];
const crumbKeys = ['crumb', 'crumbRequestField'];

const body = {
  body: Joi.object()
    .keys({
      ip: Joi.string()
        .required()
        .empty(''),
      port: Joi.number()
        .required()
        .empty(),
      token: Joi.string()
        .required()
        .empty(''),
      username: Joi.string()
        .required()
        .empty(''),
    })
    .required(),
};

const params = {
  params: Joi.object()
    .keys({
      id: Joi.string()
        .required()
        .empty(),
    })
    .required(),
};

const createCsrfSchema = {
  schema: Object.assign({}, body),
  schemaCompiler: schema => data => Joi.validate(data, schema),
};

const deleteCsrfSchema = {
  schema: Object.assign({}, params),
  schemaCompiler: schema => data => Joi.validate(data, schema),
};

export default {
  inputKeys,
  crumbKeys,
  createCsrfSchema,
  deleteCsrfSchema,
};
