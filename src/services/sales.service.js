const salesModel = require('../models/sales.model');
const { quantityNumberValidation, productIdValidation } = require('./validations/salesValidation');

const salesProducts = async (sales) => {
  const { type, message } = quantityNumberValidation(sales);
  if (type) return { type, message };
  const idValidation = await productIdValidation(sales);
  if (idValidation.includes(undefined)) return { type: 404, message: 'Product not found' };
  const saleId = await salesModel.addSales();
  await Promise.all(sales.map(async (value) => salesModel.addSalesRequisition(saleId, value)));
  const result = { id: saleId, itemsSold: sales };
  return { type: null, message: result };
};

const findAllSales = async () => {
  const result = await salesModel.findSales();
  return { type: null, message: result };
};

const findById = async (id) => {
  const result = await salesModel.findSaleById(id);
  console.log(result);
  if (result.length === 0) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: null, message: result };
};

module.exports = {
  salesProducts,
  findAllSales,
  findById,
};
