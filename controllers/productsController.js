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
    const { name } = req.body;
    const { data, code } = await productsService.createProduct(name);
    if (code === 400) {
      return res.status(code).json({ message: data });
    }
    if (code === 422) {
      return res.status(code).json({ message: data });
    }
    return res.status(code).json(data);
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { data, code } = await productsService.updateProduct(id, name);
    if (code === 404) {
      return res.status(code).json({ message: data });
    }
    if (code === 400) {
      return res.status(code).json({ message: data });
    }
    if (code === 422) {
      return res.status(code).json({ message: data });
    }
    return res.status(code).json(data);
   },
};

module.exports = productsController;
