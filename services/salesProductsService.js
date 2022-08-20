const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductModel');
const productsModel = require('../models/productsModel');

const salesProductsService = {
  productsValidation: async (products) => {
    const productsIds = products.map((product) => product.productId);
    const searchProducts = await Promise.all(
      productsIds.map(async (id) => productsModel.getProductById(id)),
    );
    if (searchProducts.some((product) => product === undefined)) {
      return { code: 404, data: 'Product not found' };
    }
  },

  bodyValidation: async (sales) => {
    if (sales.find((sale) => sale.productId === undefined)) {
      return { data: '"productId" is required', code: 400 };
    }
    if (sales.find((sale) => sale.quantity === undefined)) {
      return { data: '"quantity" is required', code: 400 };
    }
    if (sales.find((sale) => sale.quantity < 1)) {
      return {
        data: '"quantity" must be greater than or equal to 1',
        code: 422,
      };
    }
  },

  createSaleProduct: async (sales) => {
    const inputValidation = await salesProductsService.bodyValidation(sales);
    if (inputValidation) return inputValidation;

    const productsValidation = await salesProductsService.productsValidation(
      sales,
    );
    if (productsValidation) return productsValidation;

    const id = await salesModel.createSale();
    await Promise.all(
      sales.map(async (sale) => {
        await salesProductsModel.createSaleProduct(
          id,
          sale.productId,
          sale.quantity,
        );
      }),
    );
    return { data: { id, itemsSold: sales }, code: 201 };
  },

  getAllSalesProducts: async () => {
    const sales = await salesProductsModel.getAllSalesProducts();
    return { data: sales, code: 200 };
  },

  getSalesProductsBySaleId: async (id) => {
    const sales = await salesProductsModel.getSalesProductsBySaleId(id);

    if (!sales || sales.length === 0) {
      return { code: 404, data: 'Sale not found' };
    }

    return { data: sales, code: 200 };
  },

  deleteSaleProduct: async (id) => { 
    const result = await salesModel.deleteSaleProduct(id);
    if (result === 0) {
      return { code: 404, data: 'Sale not found' };
    }
    return { code: 204 };
  },
};

module.exports = salesProductsService;
