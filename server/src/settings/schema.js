// // npm packages
import Joi from 'joi';

const keys = ['ip', 'port', 'token', 'username'];

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

const createSettingsSchema = {
  schema: Object.assign({}, body),
  schemaCompiler: schema => data => Joi.validate(data, schema),
};

const updateSettingsSchema = {
  schema: Object.assign({}, body, params),
  schemaCompiler: schema => data => Joi.validate(data, schema),
};

export default {
  keys,
  createSettingsSchema,
  updateSettingsSchema,
};
