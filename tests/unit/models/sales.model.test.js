const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');

const { salesList, saleByid, afterDeleteSalesList } = require('./mocks/products.model.mock.js');

describe('sales model layer unit test', function () {
  afterEach(sinon.restore);
  it('returns an array containing all sales', async function () {
    sinon.stub(connection, 'execute').resolves([salesList]);
    const result = await salesModel.findSales();
    expect(result).to.be.a('array');
    expect(result).to.be.deep.equal(salesList);
  });
  it('finds a sale by id', async function () {
    const sale = {
      "saleId": 2,
      "date": "2022-11-17T18:47:54.000Z",
      "productId": 3,
      "quantity": 15
    };
    sinon.stub(connection, 'execute').resolves([saleByid]);
    const result = await salesModel.findSaleById(2);
    expect(result).to.be.deep.equal(sale);
  });
  it('adds a new sale id', async function () {
    const newSale = [
      {
        "productId": 3,
        "quantity": 23
      },
    ];   
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const result = await salesModel.addSales(newSale);
    expect(result).to.be.deep.equal(3);
  });
  it('adds a new sale requisition', async function () {
    const newSale = {
      "id": 3,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 10
        }
      ]
    };
    sinon.stub(connection, 'execute').resolves(newSale);
    const result = await salesModel.addSalesRequisition(3, { productId: 1, quantity: 10});
    expect(result).to.be.deep.equal(newSale);
  });
  // it('updates a product', async function () {
  //   const expected = {
  //     "name": "Martelo do Batman"
  //   };
  //   sinon.stub(connection, 'execute').resolves([[expected]]);
  //   const result = await productsModel.updateProduct(productById.name, productById.id);
  //   expect(result).to.be.deep.equal(expected);
  // });
  it('deletes a sale', async function () {
    sinon.stub(connection, 'execute').resolves([afterDeleteSalesList]);
    await salesModel.deleteSale(2)
    const result = await salesModel.findSales();
    expect(result).not.to.be.deep.equal(salesList);
  });
});
