const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const { products, productById } = require('../models/mocks/products.model.mock');

describe('products service layer unit test', function () {
  afterEach(sinon.restore);
  describe('shows response after a product search by Id', function () {
    it('successfully shows the product', async function () {
      sinon.stub(productsModel, 'findProductById').resolves(productById);
      const result = await productsService.findById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(productById);
    });
    it('product not found', async function () {
      sinon.stub(productsModel, 'findProductById').resolves(undefined);
      const result = await productsService.findById(4);
      expect(result.type).to.equal(404);
      expect(result.message).to.equal('Product not found');
    });
  });
  it('shows the products list', async function () {
    sinon.stub(productsModel, 'findAllProducts').resolves([products]);
    afterEach(sinon.restore);
    const list = await productsService.findAll();
    expect(list.message instanceof Array).to.equal(true);
    expect(list.message).to.be.deep.equal([products]);
  });
});
