const productsModel = require('../../models/products.model');

const quantityNumberValidation = (number) => {
  const amount = number.map(({ quantity }) => quantity);
  if (amount.some((value) => value <= 0)) {
    return { type: 422, message: '"quantity" must be greater than or equal to 1' };
  }
  return { type: null, message: '' };
};

const productIdValidation = async (sales) => {
  const ids = Promise.all(sales.map(async ({ productId }) => {
    const search = await productsModel.findProductById(productId);
    return search;
  }));
  const result = await ids;
  return result;
};

module.exports = {
  quantityNumberValidation,
  productIdValidation,
};
