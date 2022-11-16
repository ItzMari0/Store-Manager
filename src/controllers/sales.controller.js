const salesService = require('../services/sales.service');
const idquantityValidation = require('../middlewares/productValidation.middleware');

const salesList = async (req, res) => {
  const sales = req.body;
  const validation = await idquantityValidation(sales);
  const validated = validation.every((product) => product === 'requirement ok');
  if (validated) {
    const { type, message } = await salesService.salesProducts(req.body);
    if (type) return res.status(type).json({ message });
    return res.status(201).json(message);
  }
  if (validation.includes('missing product id')) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (validation.includes('missing product quantity')) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
};

module.exports = { salesList };