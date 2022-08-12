const productsService = require('../services/productsServices');

const productsController = {
  getAllProducts: async (req, res) => {
    const products = await productsService.getAllProducts();
    return res.status(200).json(products);
  },

  getProductById: async (req, res) => {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    if (!product || product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  },
};

module.exports = productsController;