const schema = require('./schema');

const { createProductSchema } = schema;

const newProductValidation = (name) => {
  const { error } = createProductSchema.validate(name);
  if (error) return { type: 422, message: '"name" length must be at least 5 characters long' };
  return { type: null, message: '' };
};

module.exports = {
  newProductValidation,
};
