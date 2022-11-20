const salesModel = require('../models/sales.model');
const { quantityNumberValidation, productIdValidation } = require('./validations/salesValidation');
const saleIdValidation = require('../middlewares/saleUpdateValidation.middleware');

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
  if (result.length === 0) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: null, message: result };
};

const deleteFromList = async (id) => {
  const result = await salesModel.findSaleById(id);
  if (result.length === 0) return { type: 404, message: 'Sale not found' };
  await salesModel.deleteSale(id);
  return { type: null };
};

const updateSaleDetail = async (id, sales) => {
  const findSaleId = await salesModel.findSaleById(id);
  const { type, message } = saleIdValidation(findSaleId);
  if (type) return { type, message };
  const value = quantityNumberValidation(sales);
  if (value.type) return { type: value.type, message: value.message };
  const idValidation = await productIdValidation(sales);
  if (idValidation.includes(undefined)) return { type: 404, message: 'Product not found' };
  await Promise.all(sales
    .map(({ quantity, productId }) => salesModel.updateSale(quantity, id, productId)));
  const result = { saleId: id, itemsUpdated: sales };
  return { type: null, message: result };
};

module.exports = {
  salesProducts,
  findAllSales,
  findById,
  deleteFromList,
  updateSaleDetail,
};
