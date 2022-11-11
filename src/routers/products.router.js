const { Router } = require('express');
const productsController = require('../controllers/products.controller');
  
const route = Router();

route.get('/', productsController.findAllProducts);
route.get('/:id', productsController.findProductById);

module.exports = route;
