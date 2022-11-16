module.exports = async (sales) => {
  const IdquantityValidation = await Promise.all(sales.map(({ productId, quantity }) => {
    if (productId === undefined) {
      return 'missing product id';
    }
    if (quantity === undefined) {
      return 'missing product quantity';
    }
    return 'requirement ok';
  }));
  return IdquantityValidation;
};
