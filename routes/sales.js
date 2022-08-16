const { Router } = require('express');

const route = Router();
const salesProductsController = require('../controllers/salesProductsController');

route.post('/', salesProductsController.createSaleProduct);

module.exports = route;