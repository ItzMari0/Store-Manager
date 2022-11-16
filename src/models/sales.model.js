const camelize = require('camelize');
const connection = require('./connection');

const addSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUE ()',
  );
  return insertId;
};

const addSalesRequisition = async (saleId, { productId, quantity }) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return result;
};

const findSales = async () => {
  const [result] = await connection.execute(
    `SELECT t2.sale_id, t1.date, t2.product_id, t2.quantity FROM StoreManager.sales AS t1 
    INNER JOIN StoreManager.sales_products AS t2 ON t1.id = t2.sale_id
    ORDER BY t2.sale_id, t2.product_id`,
  );
  return camelize(result);
};

const findSaleById = async (id) => {
 const [result] = await connection.execute(
    `SELECT t1.date, t2.product_id, t2.quantity FROM StoreManager.sales AS t1 
    INNER JOIN StoreManager.sales_products AS t2 ON t1.id = t2.sale_id WHERE t1.id = ?
    ORDER BY t2.product_id`,
    [id],
  );
  return camelize(result);
};

module.exports = {
  addSales,
  addSalesRequisition,
  findSales,
  findSaleById,
};