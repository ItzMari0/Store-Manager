const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const { salesList, saleByid } = require('../models/mocks/products.model.mock');

describe('sales service layer unit test', function () {
  afterEach(sinon.restore);
  describe('shows response after a sales search by Id', function () {
    it('successfully shows the sale', async function () {
      const findSale = [
        {
          "date": "2022-11-17T19:40:48.000Z",
          "productId": 3,
          "quantity": 15
        }
      ];
      sinon.stub(salesModel, 'findSaleById').resolves(findSale);
      const result = await salesService.findById(2);
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(findSale);
    });
    it('sale not found', async function () {
      sinon.stub(salesModel, 'findSaleById').resolves([]);
      const result = await salesService.findById(4);
      expect(result.type).to.equal(404);
      expect(result.message).to.equal('Sale not found');
    });
  });
  it('shows the sales list', async function () {
    sinon.stub(salesModel, 'findSales').resolves([salesList]);
    const list = await salesService.findAllSales();
    expect(list.message instanceof Array).to.equal(true);
    expect(list.message).to.be.deep.equal([salesList]);
  });
  describe('Adding a new sale', function () {
    it('successfully adds the sale', async function () {
      const newSale = {
        "id": 3,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 10
          }
        ]
      };
      sinon.stub(salesModel, 'addSales').resolves(3);
      sinon.stub(salesModel, 'addSalesRequisition').resolves(3, { productId: 1, quantity: 10 });
      const result = await salesService.salesProducts([{ productId: 1, quantity: 10 }]);
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(newSale);
    });
    it('quantity validation', async function () {
      sinon.stub(salesModel, 'addSales').resolves(3);
      sinon.stub(salesModel, 'addSalesRequisition').resolves(3, { productId: 1, quantity: 0 });
      const result = await salesService.salesProducts([{ productId: 1, quantity: 0 }]);
      expect(result.type).to.equal(422);
      expect(result.message).to.be.deep.equal('"quantity" must be greater than or equal to 1');
    });
    it('productId validation', async function () {
      sinon.stub(salesModel, 'addSales').resolves(3);
      sinon.stub(salesModel, 'addSalesRequisition').resolves(3, { productId: 0, quantity: 10 });
      const result = await salesService.salesProducts([{ productId: 0, quantity: 10 }]);
      expect(result.type).to.equal(404);
      expect(result.message).to.be.deep.equal('Product not found');
    });
  });
  // describe('updating a product', function () {
  //   it('name has less than 5 characters', async function () {
  //     const name = { "name": "fail" };
  //     sinon.stub(productsModel, 'updateProduct').resolves([[name]]);
  //     const result = await productsService.updateProductName(name);
  //     expect(result.type).to.equal(422);
  //     expect(result.message).to.be.deep.equal('"name" length must be at least 5 characters long');
  //   });
  //   it('product not found', async function () {
  //     const notFound = {
  //       "id": 5,
  //       "name": "Xabláu"
  //     };
  //     sinon.stub(productsModel, 'updateProduct').resolves(undefined);
  //     sinon.stub(productsModel, 'findProductById').resolves(undefined);
  //     const result = await productsService.updateProductName(notFound.name, notFound.id);
  //     expect(result.type).to.equal(404);
  //     expect(result.message).to.be.deep.equal('Product not found');
  //   });
  //   it('product updated', async function () {
  //     const updated = {
  //       "id": 1,
  //       "name": "Martelo do Batman"
  //     };
  //     sinon.stub(productsModel, 'updateProduct').resolves(updated);
  //     sinon.stub(productsModel, 'findProductById').resolves(1);
  //     const result = await productsService.updateProductName(updated.name, 1);
  //     expect(result.type).to.equal(null);
  //     expect(result.message).to.be.deep.equal(updated);
  //   });
  // });
  describe('Delete function', function () {
    it('deletes a sale', async function () {
      sinon.stub(salesModel, 'deleteSale').resolves(saleByid);
      const { type } = await salesService.deleteFromList(2);
      sinon.stub(salesModel, 'findSaleById').resolves([]);
      expect(type).to.equal(null);
    });
    it('sale not found', async function () {
      sinon.stub(salesModel, 'deleteSale').resolves(undefined);
      const result = await salesService.deleteFromList(10);
      expect(result.type).to.equal(404);
      expect(result.message).to.equal('Sale not found');
    });
  });
});
