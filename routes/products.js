const { Router } = require('express');

const route = Router();
const productsController = require('../controllers/productsController');

route.get('/', productsController.getAllProducts);

route.get('/:id', productsController.getProductById);

module.exports = route;