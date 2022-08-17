const salesProductsService = require('../services/salesProductsService');

const salesProductsController = {
  createSaleProduct: async (req, res) => {
    const sales = req.body.map((sale) => sale);
    const { code, data } = await salesProductsService.createSaleProduct(sales);
    if (code === 400) { 
      return res.status(code).json({ message: data });
    }
    if (code === 422) { 
      return res.status(code).json({ message: data });
    }
    if (code === 404) {
      return res.status(code).json({ message: data });
    }
    res.status(code).json(data);
  },

  getAllSalesProducts: async (req, res) => {
    const { code, data } = await salesProductsService.getAllSalesProducts();
    if (code === 404) {
      return res.status(code).json({ message: data });
    }
    res.status(code).json(data);
  },

  getSalesProductsBySaleId: async (req, res) => {
    const { id } = req.params;
    const { code, data } = await salesProductsService.getSalesProductsBySaleId(id);
    if (code === 404) {
      return res.status(code).json({ message: data });
    }
    res.status(code).json(data);
  },
};

module.exports = salesProductsController;