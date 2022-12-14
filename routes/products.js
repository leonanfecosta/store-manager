const { Router } = require('express');

const route = Router();
const productsController = require('../controllers/productsController');

route.get('/', productsController.getAllProducts);

route.get('/search/', productsController.searchProduct);

route.get('/:id', productsController.getProductById);

route.post('/', productsController.createProduct);

route.put('/:id', productsController.updateProduct);

route.delete('/:id', productsController.deleteProduct);

module.exports = route;
