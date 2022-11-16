const Joi = require('joi');

const createProductSchema = Joi.string().min(5).required();

module.exports = {
  createProductSchema,
};
