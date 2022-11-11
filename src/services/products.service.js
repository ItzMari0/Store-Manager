const productsModel = require('../models/products.model');

const findAll = async () => {
  const result = await productsModel.findAllProducts();
  return { type: null, message: result };
};

const findById = async (id) => {
  const result = await productsModel.findProductById(id);
  if (result.length === 0) {
    return { type: 404, message: 'Product not found' };
  }
  return { type: null, message: result[0] };
};

module.exports = {
  findAll,
  findById,
};
