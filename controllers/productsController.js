const productsService = require('../services/productsServices');

const productsController = {
  getAllProducts: async (_req, res) => {
    const products = await productsService.getAllProducts();
    return res.status(200).json(products);
  },

  getProductById: async (req, res) => {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  },

  createProduct: async (req, res) => {
    try {
      const { name } = req.body;
      const product = await productsService.createProduct(name);
      return res.status(201).json(product);
    } catch (error) { 
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = productsController;