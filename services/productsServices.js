const productsModel = require('../models/productsModel');

const productsService = {
  getAllProducts: async () => {
    const products = await productsModel.getAllProducts();
    return products;
  },

  getProductById: async (id) => {
    const product = await productsModel.getProductById(id);
    return product;
  },

  createProduct: async (name) => {
    if (!name) {
      return { data: '"name" is required', code: 400 };
    }
    if (name.length < 5) {
      return {
        data: '"name" length must be at least 5 characters long',
        code: 422,
      };
    }
    const product = await productsModel.createProduct(name);
    return { data: product, code: 201 };  
  },
};

module.exports = productsService;