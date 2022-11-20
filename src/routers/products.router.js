const { Router } = require('express');
const productsController = require('../controllers/products.controller');
const productNameValidation = require('../middlewares/productNameValidation.middleware');

const router = Router();

router.get('/', productsController.findAllProducts);
router.get('/search', productsController.searchProduct);
router.get('/:id', productsController.findProductById);
router.post('/', productNameValidation, productsController.addProduct);
router.put('/:id', productNameValidation, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
