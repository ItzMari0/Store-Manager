const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');

const { products, productById } = require('./mocks/products.model.mock.js');

describe('products model layer unit test', function () {
  it('returns an array containing all products', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModel.findAllProducts();
    expect(result).to.be.a('array');
    expect(result).to.be.deep.equal(products);
  });

  it('finds a product by id', async function () {
    const product = {
      id: 1,
      name: "Martelo de Thor"
    };
    sinon.stub(connection, 'execute').resolves([[product]]);
    const result = await productsModel.findProductById(1);
    expect(result).to.be.deep.equal(productById);
  });
  afterEach(sinon.restore);
});
