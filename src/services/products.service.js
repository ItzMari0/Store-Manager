const productsModel = require('../models/products.model');
const { newProductValidation } = require('./validations/productsValidation');

const findAll = async () => {
  const result = await productsModel.findAllProducts();
  return { type: null, message: result };
};

const findById = async (id) => {
  const result = await productsModel.findProductById(id);
  if (!result) {
    return { type: 404, message: 'Product not found' };
  }
  return { type: null, message: result };
};

const createProduct = async (product) => {
  const error = newProductValidation(product.name);
  if (error.type) return error;
  const productId = await productsModel.addProduct(product);
  const result = await productsModel.findProductById(productId);
  return { type: null, message: result };
};

const updateProductName = async (name, id) => {
  const error = newProductValidation(name);
  if (error.type) return error;
  const result = await productsModel.updateProduct(name, id);
  if (!result) return { type: 404, message: 'Product not found' };
  return { type: null, message: result };
};

const deleteFromList = async (id) => {
  const notFound = await productsModel.findProductById(id);
  if (!notFound) {
    return { type: 404, message: 'Product not found' };
  }
  await productsModel.deleteProduct(id);
  return { type: null };
};

const searchProductName = async (name) => {
  const result = await productsModel.searchProduct(name);
  return { type: 200, message: result };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProductName,
  deleteFromList,
  searchProductName,
};
