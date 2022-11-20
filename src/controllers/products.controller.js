const productsService = require('../services/products.service');

const findAllProducts = async (_req, res) => {
  const { message } = await productsService.findAll();
  // if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const addProduct = async (req, res) => {
  const { type, message } = await productsService.createProduct(req.body);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { type, message } = await productsService.updateProductName(name, id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteFromList(id);
  if (type) return res.status(type).json({ message });
  return res.status(204).send();
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await productsService.searchProductName(q);
  return res.status(type).json(message);
};

module.exports = {
  findAllProducts,
  findProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
