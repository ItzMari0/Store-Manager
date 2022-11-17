const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const { salesList } = require('../models/mocks/products.model.mock');

describe('sales controller layer unit test', function () {
  afterEach(sinon.restore);
  it('shows sales list', async function () {
    sinon.stub(salesService, 'findAllSales')
      .resolves({ type: null, message: salesList });
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.findSales(req, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledWith(salesList);
  });
  it('shows sale by id', async function () {
    const result = [
      {
        "date": "2022-11-17T20:43:05.000Z",
        "productId": 3,
        "quantity": 15
      }
    ];
    sinon.stub(salesService, 'findById')
      .resolves({ type: null, message: result });
    const res = {};
    const req = { params: { id: 2 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.findSaleById(req, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledWith(result);
  });
  // it('shows Product not found', async function () {
  //   sinon.stub(salesService, 'findById')
  //     .resolves(notFound);
  //   const res = {};
  //   const req = { params: { id: 4 } };

  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

  //   await productsController.findProductById(req, res);
  //   expect(res.status).to.have.been.calledOnceWith(404);
  //   expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  // });
  it('adds a sale', async function () {
    const newSale = {
        "id": 3,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 10
          }
        ]
    };
    sinon.stub(salesService, 'salesProducts')
      .resolves([{ productId: 1, quantity: 10 }]);
    const res = {};
    const req = { params: { id: 3 }, body: [{ productId: 1, quantity: 10 }] };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.salesList(req, res);
    expect(res.status).to.have.been.calledWith(201);
    // expect(res.json).to.have.been.calledWith(newSale);
  });
  it('quantity validation', async function () {
    sinon.stub(salesService, 'salesProducts')
      .resolves([{ productId: 1, quantity: undefined }]);
    const res = {};
    const req = { params: { id: 3 }, body: [{ productId: 1, quantity: undefined }] };
      
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    await salesController.salesList(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });
  it('productId validation', async function () {
    sinon.stub(salesService, 'salesProducts')
      .resolves([{ productId: undefined, quantity: 10 }]);
    const res = {};
    const req = { params: { id: 3 }, body: [{ productId: undefined, quantity: 10 }] };
      
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    await salesController.salesList(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });
  // it('updates a product', async function () {
  //   const updated = { type: null, message: updatedProduct };

  //   sinon.stub(productsService, 'updateProductName')
  //     .resolves({ type: null, message: updatedProduct });
  //   const res = {};
  //   const req = { params: { id: 1 }, body: { name: "Martelo do Batman " } };

  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

  //   await productsController.updateProduct(req, res);
  //   expect(res.status).to.have.been.calledOnceWith(200);
  //   expect(res.json).to.have.been.calledWith(updated.message);
  // });
  it('deletes a sale', async function () {
    const deleted = [
      {
        "date": "2022-11-17T20:43:05.000Z",
        "productId": 3,
        "quantity": 15
      }
    ];
    sinon.stub(salesService, 'deleteFromList')
      .resolves({ type: null, message: deleted });
    const res = {};
    const req = { params: { id: 2 } };

    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns();

    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledOnceWith(204);
  });
});
