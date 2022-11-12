const products = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  },
];

const productById = {
  "id": 1,
  "name": "Martelo de Thor"
};

const productsResponse = { type: null, message: products };

const productByIdResponse = { type: null, message: productById };

const notFound = { type: 404, message: 'Product not found' };

module.exports = {
  products,
  productById,
  productsResponse,
  productByIdResponse,
  notFound,
};
