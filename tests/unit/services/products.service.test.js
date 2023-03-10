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
    const list = await productsService.findAll();
    expect(list.message instanceof Array).to.equal(true);
    expect(list.message).to.be.deep.equal([products]);
  });
  describe('Adding a new product', function () {
    it('successfully adds the product', async function () {
      const newProductName = { name: "ProdutoX" };
      const newProduct = {
        id: 4,
        name: "ProdutoX"
      };
      sinon.stub(productsModel, 'addProduct').resolves([{ insertId: 4 }]);
      sinon.stub(productsModel, 'findProductById').resolves(newProduct);
      const result = await productsService.createProduct(newProductName);
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(newProduct);
    });
    it('product validation', async function () {
      const newProductName = { name: "Prod" };
      sinon.stub(productsModel, 'addProduct').resolves([{ insertId: 4 }]);
      sinon.stub(productsModel, 'findProductById').resolves(undefined);
      const result = await productsService.createProduct(newProductName);
      expect(result.type).to.equal(422);
      expect(result.message).to.be.deep.equal('"name" length must be at least 5 characters long');
    });
  });
  describe('updating a product', function () {
    it('name has less than 5 characters', async function () {
      const name = { "name": "fail" };
      sinon.stub(productsModel, 'updateProduct').resolves([[name]]);
      const result = await productsService.updateProductName(name);
      expect(result.type).to.equal(422);
      expect(result.message).to.be.deep.equal('"name" length must be at least 5 characters long');
    });
    it('product not found', async function () {
      const notFound = {
        "id": 5,
        "name": "Xabl??u"
      };
      sinon.stub(productsModel, 'updateProduct').resolves(undefined);
      sinon.stub(productsModel, 'findProductById').resolves(undefined);
      const result = await productsService.updateProductName(notFound.name, notFound.id);
      expect(result.type).to.equal(404);
      expect(result.message).to.be.deep.equal('Product not found');
    });
    it('product updated', async function () {
      const updated = {
        "id": 1,
        "name": "Martelo do Batman"
      };
      sinon.stub(productsModel, 'updateProduct').resolves(updated);
      sinon.stub(productsModel, 'findProductById').resolves(1);
      const result = await productsService.updateProductName(updated.name, 1);
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(updated);
    });
  });
  describe('Delete function', function () {
    it('deletes a product', async function () {
      sinon.stub(productsModel, 'deleteProduct').resolves([productById]);
      const { type } = await productsService.deleteFromList(1);
      expect(type).to.equal(null);
    });
    it('product not found', async function () {
      const notFound = {
        "id": 5,
        "name": "Xabl??u"
      };
      sinon.stub(productsModel, 'deleteProduct').resolves(undefined);
      const result = await productsService.deleteFromList(notFound.id);
      expect(result.type).to.equal(404);
      expect(result.message).to.equal('Product not found');
    });
  });
});
