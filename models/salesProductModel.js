const connection = require('./connection');

const salesProductModel = {
  createSaleProduct: async (id, productId, quantity) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [id, productId, quantity],
    );
    return true;
  },
};
module.exports = salesProductModel;