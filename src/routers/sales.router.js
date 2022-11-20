const { Router } = require('express');
const salesController = require('../controllers/sales.controller');

const router = Router();

router.post('/', salesController.salesList);
router.get('/', salesController.findSales);
router.get('/:id', salesController.findSaleById);
router.delete('/:id', salesController.deleteSale);
router.put('/:id', salesController.updateSale);

module.exports = router;
