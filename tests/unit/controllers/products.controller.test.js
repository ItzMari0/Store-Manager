const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const { products, productById, productsResponse, productByIdResponse, notFound } = require('../models/mocks/products.model.mock');

describe('products controller layer unit test', function () {
  afterEach(sinon.restore);
  it('shows products list', async function () {
    sinon.stub(productsService, 'findAll')
      .resolves({ type: null, message: products });
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.findAllProducts(req, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledWith(productsResponse.message);
  });
  it('shows product by Id', async function () {
    sinon.stub(productsService, 'findById')
      .resolves({ type: null, message: productById });
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.findProductById(req, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledWith(productByIdResponse.message);
  });
  it('shows Product not found', async function () {
    sinon.stub(productsService, 'findById')
      .resolves(notFound);
    const res = {};
    const req = { params: { id: 4 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.findProductById(req, res);
    expect(res.status).to.have.been.calledOnceWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});
