const connection = require('./connection');

const findAllProducts = async () => {
 const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
  );
  return result;
};

const findProductById = async (id) => {
 const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

module.exports = {
  findAllProducts,
  findProductById,
};