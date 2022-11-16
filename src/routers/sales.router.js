const { Router } = require('express');
const salesController = require('../controllers/sales.controller');

const router = Router();

router.post('/', salesController.salesList);

module.exports = router;
