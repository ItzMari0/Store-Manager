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

const afterDeleteProducts = [
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

const updatedProduct = {
  "id": 1,
  "name": "Martelo do Batman"
};

const productsResponse = { type: null, message: products };

const productByIdResponse = { type: null, message: productById };

const notFound = { type: 404, message: 'Product not found' };

const salesList = [
  {
    "saleId": 1,
    "date": "2022-11-17T18:47:54.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-11-17T18:47:54.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-11-17T18:47:54.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const afterDeleteSalesList = [
  {
    "saleId": 1,
    "date": "2022-11-17T18:47:54.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-11-17T18:47:54.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const saleByid = {
  "saleId": 2,
  "date": "2022-11-17T18:47:54.000Z",
  "productId": 3,
  "quantity": 15
};

module.exports = {
  products,
  productById,
  productsResponse,
  productByIdResponse,
  notFound,
  afterDeleteProducts,
  updatedProduct,
  salesList,
  afterDeleteSalesList,
  saleByid,
};
