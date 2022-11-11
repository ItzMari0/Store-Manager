const productsService = require('../services/products.service');

const findAllProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  findAllProducts,
  findProductById,
};
