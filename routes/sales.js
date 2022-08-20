const { Router } = require('express');

const route = Router();
const salesProductsController = require('../controllers/salesProductsController');

route.post('/', salesProductsController.createSaleProduct);

route.get('/', salesProductsController.getAllSalesProducts);

route.get('/:id', salesProductsController.getSalesProductsBySaleId);

route.delete('/:id', salesProductsController.deleteSaleProduct);

module.exports = route;